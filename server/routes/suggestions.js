const express = require('express');
const Emission = require('../models/Emission');
const auth = require('../middleware/auth');

const router = express.Router();

const generateSuggestions = (emissions, stats) => {
  const suggestions = [];

  if (stats.avgEmissions > 5) {
    suggestions.push({
      title: 'High Emission Alert',
      description: 'Your average CO₂ emissions are above recommended levels. Consider switching to more eco-friendly transport options.',
      priority: 'high',
      icon: 'alert-triangle'
    });
  }

  const hasPetrolDiesel = emissions.some(e => ['petrol', 'diesel'].includes(e.fuelType));
  if (hasPetrolDiesel) {
    suggestions.push({
      title: 'Switch to Electric Vehicles',
      description: 'Electric vehicles produce significantly lower emissions. Consider transitioning to an EV for daily commutes.',
      priority: 'medium',
      icon: 'zap'
    });
  }

  const hasMultipleShortTrips = emissions.filter(e => e.distance < 5).length > 3;
  if (hasMultipleShortTrips) {
    suggestions.push({
      title: 'Use Public Transport or Bike',
      description: 'For short distances under 5km, consider using public transport, cycling, or walking to reduce emissions.',
      priority: 'medium',
      icon: 'bike'
    });
  }

  suggestions.push({
    title: 'Maintain Proper Tire Pressure',
    description: 'Keeping tires properly inflated can improve fuel efficiency by up to 3% and reduce emissions.',
    priority: 'low',
    icon: 'settings'
  });

  suggestions.push({
    title: 'Practice Eco-Driving',
    description: 'Maintain steady speeds, avoid sudden acceleration, and use cruise control on highways to optimize fuel consumption.',
    priority: 'low',
    icon: 'trending-down'
  });

  const hasNoCarpool = emissions.length > 5;
  if (hasNoCarpool) {
    suggestions.push({
      title: 'Consider Carpooling',
      description: 'Sharing rides with colleagues or neighbors can reduce your carbon footprint by up to 50%.',
      priority: 'medium',
      icon: 'users'
    });
  }

  suggestions.push({
    title: 'Plan Your Routes',
    description: 'Use GPS navigation to find the most fuel-efficient routes and avoid traffic congestion.',
    priority: 'low',
    icon: 'map'
  });

  return suggestions;
};

router.get('/', auth, async (req, res) => {
  try {
    const emissions = await Emission.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(30);

    const totalEmissions = emissions.reduce((sum, e) => sum + e.co2Emissions, 0);
    const avgEmissions = emissions.length > 0 ? totalEmissions / emissions.length : 0;

    const stats = {
      totalEmissions,
      avgEmissions,
      count: emissions.length
    };

    const suggestions = generateSuggestions(emissions, stats);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
