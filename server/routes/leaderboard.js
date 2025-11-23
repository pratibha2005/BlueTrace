const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Emission = require('../models/Emission');
const auth = require('../middleware/auth');

// Calculate user rank based on total emissions saved
function calculateRank(totalSaved) {
  if (totalSaved >= 500) return { name: 'Platinum', color: '#E5E4E2', icon: '💎' };
  if (totalSaved >= 300) return { name: 'Gold', color: '#FFD700', icon: '🏆' };
  if (totalSaved >= 150) return { name: 'Silver', color: '#C0C0C0', icon: '🥈' };
  if (totalSaved >= 50) return { name: 'Bronze', color: '#CD7F32', icon: '🥉' };
  return { name: 'Beginner', color: '#8B4513', icon: '🌱' };
}

// Get leaderboard data
router.get('/', auth, async (req, res) => {
  try {
    // Get all users
    const users = await User.find().select('name email createdAt');
    
    // Calculate stats for each user
    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        const emissions = await Emission.find({ userId: user._id });
        
        // Calculate total emissions from all records
        const totalEmissions = emissions.reduce((sum, e) => sum + (e.co2Emissions || 0), 0);
        
        // For leaderboard ranking, we'll use a formula:
        // Baseline emissions (average car: 10kg CO2 per trip) - actual emissions
        const baselinePerTrip = 10; // kg CO2 for an average car trip
        const avgEmissionsPerTrip = emissions.length > 0 ? totalEmissions / emissions.length : 0;
        const totalSaved = Math.max(0, (baselinePerTrip - avgEmissionsPerTrip) * emissions.length);
        
        const greenTrips = emissions.filter(e => 
          e.vehicleType.includes('electric') || e.co2Emissions < 5
        ).length;
        
        const rank = calculateRank(totalSaved);
        
        return {
          userId: user._id,
          name: user.name,
          email: user.email,
          totalEmissions: Number(totalEmissions.toFixed(2)),
          totalSaved: Number(totalSaved.toFixed(2)),
          greenTrips,
          rank,
          joinedDate: user.createdAt,
          badges: [
            totalSaved >= 100 && { name: 'Century Saver', icon: '💯' },
            greenTrips >= 10 && { name: 'Route Master', icon: '🗺️' },
            totalSaved >= 50 && { name: 'Eco Warrior', icon: '⚔️' },
            greenTrips >= 5 && { name: 'Green Driver', icon: '🚗' },
            emissions.length >= 20 && { name: 'Frequent Tracker', icon: '📊' }
          ].filter(Boolean)
        };
      })
    );
    
    // Sort by total saved (descending)
    leaderboardData.sort((a, b) => b.totalSaved - a.totalSaved);
    
    // Add position/rank number
    const rankedData = leaderboardData.map((user, index) => ({
      ...user,
      position: index + 1
    }));
    
    // Get current user's data (but keep them in the main leaderboard)
    const currentUserId = req.userId;
    const currentUserData = rankedData.find(u => u.userId.toString() === currentUserId);
    
    res.json({
      success: true,
      leaderboard: rankedData, // All users including current user
      currentUser: currentUserData, // Current user's data for highlighting
      totalUsers: rankedData.length
    });
    
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch leaderboard' 
    });
  }
});

// Get user's detailed stats
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('name email createdAt');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    const emissions = await Emission.find({ userId });
    
    const totalEmissions = emissions.reduce((sum, e) => sum + (e.co2Emissions || 0), 0);
    
    // Calculate saved emissions based on average baseline
    const baselinePerTrip = 10;
    const avgEmissionsPerTrip = emissions.length > 0 ? totalEmissions / emissions.length : 0;
    const totalSaved = Math.max(0, (baselinePerTrip - avgEmissionsPerTrip) * emissions.length);
    
    const monthlyData = {};
    emissions.forEach(e => {
      const month = new Date(e.date).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += (e.co2Emissions || 0);
    });
    
    const rank = calculateRank(totalSaved);
    
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        totalEmissions: totalEmissions.toFixed(2),
        totalSaved: totalSaved.toFixed(2),
        rank,
        monthlyData,
        joinedDate: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user stats' 
    });
  }
});

module.exports = router;
