const express = require('express');
const Emission = require('../models/Emission');
const User = require('../models/User');
const { calculateEmissions } = require('../utils/emissionFactors');
const auth = require('../middleware/auth');
const { getAISuggestions }  = require("../utils/aiSuggestions.js");


const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { vehicleType, fuelType, fuelConsumption, distance } = req.body;

    console.log('Incoming data:', { vehicleType, fuelType, fuelConsumption, distance });
    console.log('User ID:', req.userId);

    // Calculate CO₂ emissions
    const co2Emissions = calculateEmissions(vehicleType, fuelType, fuelConsumption, distance);
    console.log('Calculated Emission:', co2Emissions);

    // Save emission record to MongoDB
    const emission = new Emission({
      userId: req.userId,
      vehicleType,
      fuelType,
      fuelConsumption,
      distance,
      co2Emissions: parseFloat(co2Emissions),
    });

    await emission.save();
    console.log('Emission saved successfully');

    // Update user's total emissions
    await User.findByIdAndUpdate(req.userId, {
      $inc: { totalEmissionsCalculated: parseFloat(co2Emissions) },
    });
    console.log('User updated successfully');

    // 🧠 Generate AI Suggestions based on this trip
    const aiSuggestions = await getAISuggestions({
      totalEmissions: co2Emissions,
      vehicleType,
    });

    // Send response back to frontend
    res.status(201).json({
      emission,
      co2Emissions: parseFloat(co2Emissions),
      aiSuggestions, // 🧠 added here
    });
  } catch (error) {
    console.error('Server error in /calculate:', error.message);
    res.status(500).json({ error: error.message });
  }
});


router.get('/history', auth, async (req, res) => {
  try {
    const emissions = await Emission.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(50);

    res.json(emissions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const emissions = await Emission.find({ userId: req.userId });

    const totalEmissions = emissions.reduce((sum, e) => sum + e.co2Emissions, 0);
    const avgEmissions = emissions.length > 0 ? totalEmissions / emissions.length : 0;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentEmissions = emissions.filter(e => e.date >= last30Days);
    const monthlyEmissions = recentEmissions.reduce((sum, e) => sum + e.co2Emissions, 0);

    const vehicleBreakdown = emissions.reduce((acc, e) => {
      acc[e.vehicleType] = (acc[e.vehicleType] || 0) + e.co2Emissions;
      return acc;
    }, {});

    res.json({
      totalEmissions: totalEmissions.toFixed(2),
      avgEmissions: avgEmissions.toFixed(2),
      monthlyEmissions: monthlyEmissions.toFixed(2),
      totalCalculations: emissions.length,
      vehicleBreakdown
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
