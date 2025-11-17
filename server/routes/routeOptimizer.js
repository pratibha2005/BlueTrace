const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Emission factors (kg CO₂ per liter of fuel)
const EMISSION_FACTORS = {
  petrol: 2.31,  // kg CO₂ per liter
  diesel: 2.68,
  cng: 1.85,
  electric: 0.82 // kg CO₂ per kWh
};

// Average fuel consumption by vehicle type (km per liter)
const FUEL_EFFICIENCY = {
  car_petrol: 15,
  car_diesel: 18,
  bike_petrol: 45,
  bike_diesel: 55,
  suv_petrol: 10,
  suv_diesel: 12,
  electric_car: 5, // km per kWh
  electric_bike: 50
};

// Calculate emissions for a route
function calculateEmissions(distance, vehicleType, fuelType) {
  const efficiency = FUEL_EFFICIENCY[`${vehicleType}_${fuelType}`] || FUEL_EFFICIENCY.car_petrol;
  const emissionFactor = EMISSION_FACTORS[fuelType] || EMISSION_FACTORS.petrol;
  
  const fuelUsed = distance / efficiency;
  const emissions = fuelUsed * emissionFactor;
  
  return {
    fuelUsed: fuelUsed.toFixed(3),
    emissions: emissions.toFixed(3),
    emissionFactor,
    efficiency
  };
}

// Calculate greenness score based on various factors
function calculateGreenScore(route) {
  // Factors: traffic, elevation, signals, road quality
  let score = 100;
  
  // Traffic penalty (0-30 points)
  if (route.trafficLevel === 'heavy') score -= 30;
  else if (route.trafficLevel === 'moderate') score -= 15;
  else if (route.trafficLevel === 'light') score -= 5;
  
  // Elevation penalty (0-20 points) - more elevation = more fuel
  const elevationChange = route.elevationGain || 0;
  score -= Math.min(elevationChange / 50, 20);
  
  // Signal/stops penalty (0-15 points)
  const stops = route.numberOfStops || 0;
  score -= Math.min(stops * 2, 15);
  
  // Road quality bonus (0-10 points)
  if (route.roadQuality === 'excellent') score += 10;
  else if (route.roadQuality === 'good') score += 5;
  else if (route.roadQuality === 'poor') score -= 5;
  
  // Highway bonus (better efficiency)
  if (route.isHighway) score += 15;
  
  return Math.max(0, Math.min(100, score));
}

// Optimize route for green travel
router.post('/optimize', auth, async (req, res) => {
  try {
    const { 
      origin, 
      destination, 
      vehicleType = 'car', 
      fuelType = 'petrol',
      routes = [] // Routes from frontend (Google Maps API)
    } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    // If routes provided by frontend, enhance them with emission data
    if (routes && routes.length > 0) {
      const analyzedRoutes = routes.map((route, index) => {
        const distance = route.distance / 1000; // Convert meters to km
        const duration = route.duration / 60; // Convert seconds to minutes
        
        // Calculate base emissions
        const baseCalc = calculateEmissions(distance, vehicleType, fuelType);
        
        // Apply green score multiplier
        const greenScore = calculateGreenScore(route);
        const greenMultiplier = greenScore / 100;
        
        // Adjust emissions based on traffic and conditions
        let adjustedEmissions = parseFloat(baseCalc.emissions);
        let adjustedFuel = parseFloat(baseCalc.fuelUsed);
        
        if (route.trafficLevel === 'heavy') {
          adjustedEmissions *= 1.4; // 40% more emissions in heavy traffic
          adjustedFuel *= 1.4;
        } else if (route.trafficLevel === 'moderate') {
          adjustedEmissions *= 1.2;
          adjustedFuel *= 1.2;
        }
        
        // Calculate cost (assuming ₹100/liter for petrol, ₹90/liter diesel, ₹10/kWh electric)
        const fuelPrice = fuelType === 'petrol' ? 100 : fuelType === 'diesel' ? 90 : 10;
        const cost = (adjustedFuel * fuelPrice).toFixed(2);
        
        return {
          ...route,
          routeNumber: index + 1,
          distance: distance.toFixed(2),
          duration: Math.round(duration),
          fuelUsed: adjustedFuel.toFixed(3),
          emissions: adjustedEmissions.toFixed(3),
          cost,
          greenScore: greenScore.toFixed(1),
          routeType: route.routeType || (index === 0 ? 'fastest' : index === 1 ? 'shortest' : 'balanced')
        };
      });

      // Sort to identify greenest route
      const sortedByEmissions = [...analyzedRoutes].sort((a, b) => 
        parseFloat(a.emissions) - parseFloat(b.emissions)
      );
      
      const greenestRoute = sortedByEmissions[0];
      const comparison = analyzedRoutes[0]; // Compare against first route (usually fastest)
      
      const emissionsSaved = (parseFloat(comparison.emissions) - parseFloat(greenestRoute.emissions)).toFixed(3);
      const costSaved = (parseFloat(comparison.cost) - parseFloat(greenestRoute.cost)).toFixed(2);

      res.json({
        success: true,
        routes: analyzedRoutes,
        recommendation: {
          greenestRouteIndex: analyzedRoutes.findIndex(r => r === greenestRoute),
          emissionsSaved: emissionsSaved > 0 ? emissionsSaved : '0',
          costSaved: costSaved > 0 ? costSaved : '0',
          message: emissionsSaved > 0 
            ? `🌿 Choose the green route to save ${emissionsSaved} kg CO₂ and ₹${costSaved}!`
            : '🌿 All routes have similar emissions. Choose based on your preference!'
        },
        vehicleInfo: {
          type: vehicleType,
          fuelType,
          efficiency: FUEL_EFFICIENCY[`${vehicleType}_${fuelType}`] || FUEL_EFFICIENCY.car_petrol
        }
      });
    } else {
      // Fallback: Generate sample routes (when Google Maps API not used)
      const baseDistance = 15; // km
      
      const sampleRoutes = [
        {
          routeNumber: 1,
          routeType: 'fastest',
          distance: (baseDistance * 1.2).toFixed(2),
          duration: 22,
          trafficLevel: 'moderate',
          numberOfStops: 8,
          elevationGain: 50,
          roadQuality: 'good',
          isHighway: true
        },
        {
          routeNumber: 2,
          routeType: 'shortest',
          distance: baseDistance.toFixed(2),
          duration: 28,
          trafficLevel: 'light',
          numberOfStops: 12,
          elevationGain: 80,
          roadQuality: 'average',
          isHighway: false
        },
        {
          routeNumber: 3,
          routeType: 'greenest',
          distance: (baseDistance * 1.1).toFixed(2),
          duration: 26,
          trafficLevel: 'light',
          numberOfStops: 6,
          elevationGain: 30,
          roadQuality: 'excellent',
          isHighway: true
        }
      ];

      const analyzedRoutes = sampleRoutes.map(route => {
        const distance = parseFloat(route.distance);
        const calc = calculateEmissions(distance, vehicleType, fuelType);
        
        let adjustedEmissions = parseFloat(calc.emissions);
        let adjustedFuel = parseFloat(calc.fuelUsed);
        
        if (route.trafficLevel === 'heavy') {
          adjustedEmissions *= 1.4;
          adjustedFuel *= 1.4;
        } else if (route.trafficLevel === 'moderate') {
          adjustedEmissions *= 1.2;
          adjustedFuel *= 1.2;
        }
        
        const greenScore = calculateGreenScore(route);
        const fuelPrice = fuelType === 'petrol' ? 100 : fuelType === 'diesel' ? 90 : 10;
        const cost = (adjustedFuel * fuelPrice).toFixed(2);
        
        return {
          ...route,
          fuelUsed: adjustedFuel.toFixed(3),
          emissions: adjustedEmissions.toFixed(3),
          cost,
          greenScore: greenScore.toFixed(1)
        };
      });

      const greenest = analyzedRoutes.find(r => r.routeType === 'greenest');
      const fastest = analyzedRoutes.find(r => r.routeType === 'fastest');
      
      const emissionsSaved = (parseFloat(fastest.emissions) - parseFloat(greenest.emissions)).toFixed(3);
      const costSaved = (parseFloat(fastest.cost) - parseFloat(greenest.cost)).toFixed(2);

      res.json({
        success: true,
        routes: analyzedRoutes,
        recommendation: {
          greenestRouteIndex: 2,
          emissionsSaved,
          costSaved,
          message: `🌿 Choose the green route to save ${emissionsSaved} kg CO₂ and ₹${costSaved}!`
        },
        vehicleInfo: {
          type: vehicleType,
          fuelType,
          efficiency: FUEL_EFFICIENCY[`${vehicleType}_${fuelType}`] || FUEL_EFFICIENCY.car_petrol
        },
        note: 'Sample routes shown. Integrate Google Maps API for real-time route data.'
      });
    }

  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to optimize routes' 
    });
  }
});

// Save eco-driving score
router.post('/save-score', auth, async (req, res) => {
  try {
    const { routeChoice, emissionsSaved, date } = req.body;
    const userId = req.userId;
    
    // Here you would save to database
    // For now, just acknowledge
    
    res.json({
      success: true,
      message: 'Eco-driving score saved!',
      points: routeChoice === 'greenest' ? 10 : routeChoice === 'shortest' ? 5 : 0
    });
    
  } catch (error) {
    console.error('Save score error:', error);
    res.status(500).json({ success: false, error: 'Failed to save score' });
  }
});

// Get eco-driving statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Mock stats - in production, fetch from database
    const stats = {
      totalTrips: 24,
      greenRoutesChosen: 18,
      totalEmissionsSaved: 12.4, // kg CO₂
      totalMoneySaved: 450, // ₹
      ecoScore: 85,
      weeklyScore: [70, 75, 82, 85, 88, 85, 90],
      topRoutes: [
        { origin: 'Home', destination: 'Office', savings: 0.8, frequency: 10 },
        { origin: 'Office', destination: 'Gym', savings: 0.3, frequency: 5 }
      ]
    };
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Route Optimizer is online! 🗺️🌱'
  });
});

module.exports = router;
