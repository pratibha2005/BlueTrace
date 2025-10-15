const express = require('express');
const User = require('../models/User');
const Emission = require('../models/Emission');
const auth = require('../middleware/auth');

const router = express.Router();

const checkAndAwardBadges = async (userId) => {
  const user = await User.findById(userId);
  const emissions = await Emission.find({ userId }).sort({ date: -1 });

  const newBadges = [];
  const existingBadgeNames = user.badges.map(b => b.name);

  if (emissions.length >= 1 && !existingBadgeNames.includes('First Step')) {
    newBadges.push({
      name: 'First Step',
      description: 'Calculated your first carbon footprint',
      dateEarned: new Date(),
      emissionReduction: 0
    });
  }

  if (emissions.length >= 10 && !existingBadgeNames.includes('Eco Tracker')) {
    newBadges.push({
      name: 'Eco Tracker',
      description: 'Tracked 10 journeys',
      dateEarned: new Date(),
      emissionReduction: 0
    });
  }

  const hasElectric = emissions.some(e => e.fuelType === 'electric');
  if (hasElectric && !existingBadgeNames.includes('Electric Pioneer')) {
    newBadges.push({
      name: 'Electric Pioneer',
      description: 'Used an electric vehicle',
      dateEarned: new Date(),
      emissionReduction: 0
    });
  }

  if (emissions.length >= 2) {
    const recentEmissions = emissions.slice(0, 10);
    const olderEmissions = emissions.slice(10, 20);

    if (olderEmissions.length > 0) {
      const recentAvg = recentEmissions.reduce((sum, e) => sum + e.co2Emissions, 0) / recentEmissions.length;
      const olderAvg = olderEmissions.reduce((sum, e) => sum + e.co2Emissions, 0) / olderEmissions.length;

      const reduction = ((olderAvg - recentAvg) / olderAvg) * 100;

      if (reduction >= 20 && !existingBadgeNames.includes('Emission Reducer')) {
        newBadges.push({
          name: 'Emission Reducer',
          description: `Reduced emissions by ${reduction.toFixed(1)}%`,
          dateEarned: new Date(),
          emissionReduction: reduction
        });
      }

      if (reduction >= 50 && !existingBadgeNames.includes('Green Champion')) {
        newBadges.push({
          name: 'Green Champion',
          description: `Achieved ${reduction.toFixed(1)}% emission reduction`,
          dateEarned: new Date(),
          emissionReduction: reduction
        });
      }
    }
  }

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const weeklyEmissions = emissions.filter(e => e.date >= last7Days);

  if (weeklyEmissions.length >= 7 && !existingBadgeNames.includes('Consistent Tracker')) {
    newBadges.push({
      name: 'Consistent Tracker',
      description: 'Tracked emissions for 7 consecutive days',
      dateEarned: new Date(),
      emissionReduction: 0
    });
  }

  if (newBadges.length > 0) {
    user.badges.push(...newBadges);
    await user.save();
  }

  return newBadges;
};

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.badges);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/check', auth, async (req, res) => {
  try {
    const newBadges = await checkAndAwardBadges(req.userId);
    res.json({
      newBadges,
      message: newBadges.length > 0 ? 'Congratulations! You earned new badges!' : 'No new badges yet'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
