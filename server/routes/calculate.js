const express = require('express');
const Emission = require('../models/Emission');
const User = require('../models/User');
const { calculateEmissions } = require('../utils/emissionFactors');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { vehicleType, fuelType, fuelConsumption, distance } = req.body;

    const co2Emissions = calculateEmissions(vehicleType, fuelType, fuelConsumption, distance);

    const emission = new Emission({
      userId: req.userId,
      vehicleType,
      fuelType,
      fuelConsumption,
      distance,
      co2Emissions: parseFloat(co2Emissions)
    });

    await emission.save();

    await User.findByIdAndUpdate(req.userId, {
      $inc: { totalEmissionsCalculated: parseFloat(co2Emissions) }
    });

    res.status(201).json({
      emission,
      co2Emissions: parseFloat(co2Emissions)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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
