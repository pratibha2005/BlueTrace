import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Fuel, Leaf, Clock, TrendingDown, Award, Zap, DollarSign } from 'lucide-react';
import { routeOptimizerAPI } from '../services/api';

interface Route {
  routeNumber: number;
  routeType: string;
  distance: string;
  duration: number;
  fuelUsed: string;
  emissions: string;
  cost: string;
  greenScore: string;
  trafficLevel?: string;
  numberOfStops?: number;
}

export default function RouteOptimizer() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [fuelType, setFuelType] = useState('petrol');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await routeOptimizerAPI.getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const optimizeRoute = async () => {
    if (!origin || !destination) return;

    setIsLoading(true);
    try {
      const response = await routeOptimizerAPI.optimize({
        origin,
        destination,
        vehicleType,
        fuelType
      });

      if (response.success) {
        setRoutes(response.routes);
        setRecommendation(response.recommendation);
      }
    } catch (error) {
      console.error('Route optimization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectRoute = async (routeIndex: number) => {
    setSelectedRoute(routeIndex);
    
    // Save eco-driving score
    try {
      const route = routes[routeIndex];
      await routeOptimizerAPI.saveScore({
        routeChoice: route.routeType,
        emissionsSaved: parseFloat(recommendation?.emissionsSaved || '0'),
        date: new Date()
      });
      
      // Open Google Maps with the selected route
      openInGoogleMaps(origin, destination, route.routeType);
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  const openInGoogleMaps = (from: string, to: string, routeType: string) => {
    // Build Google Maps URL with route preferences
    let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`;
    
    // Add route preference based on type
    if (routeType === 'fastest') {
      mapsUrl += '&travelmode=driving'; // Default is fastest
    } else if (routeType === 'shortest') {
      mapsUrl += '&travelmode=driving&dir_action=navigate';
    } else if (routeType === 'greenest' || routeType === 'balanced') {
      mapsUrl += '&travelmode=driving&avoid=highways'; // Avoid highways for eco-friendly routes
    }
    
    // Open in new tab
    window.open(mapsUrl, '_blank');
  };

  const getRouteColor = (routeType: string) => {
    if (routeType === 'fastest') return 'from-blue-500 to-blue-600';
    if (routeType === 'shortest') return 'from-purple-500 to-purple-600';
    if (routeType === 'greenest' || routeType === 'balanced') return 'from-green-500 to-emerald-600';
    return 'from-gray-500 to-gray-600';
  };

  const getRouteIcon = (routeType: string) => {
    if (routeType === 'fastest') return <Zap size={20} />;
    if (routeType === 'shortest') return <Navigation size={20} />;
    return <Leaf size={20} />;
  };

  const getTrafficColor = (level: string) => {
    if (level === 'heavy') return 'text-red-500 bg-red-50';
    if (level === 'moderate') return 'text-orange-500 bg-orange-50';
    return 'text-green-500 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <Navigation className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AI Route Optimizer
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Find the greenest route and save CO₂ with every journey 🌍</p>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Navigation className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTrips}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Green Routes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.greenRoutesChosen}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEmissionsSaved} kg</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Eco Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.ecoScore}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origin */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                Starting Point
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter origin (e.g., Connaught Place, Delhi)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Navigation size={16} className="text-green-500" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination (e.g., India Gate, Delhi)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="car">🚗 Car</option>
                <option value="bike">🏍️ Bike</option>
                <option value="suv">🚙 SUV</option>
                <option value="electric_car">⚡ Electric Car</option>
                <option value="electric_bike">⚡ Electric Bike</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Fuel size={16} className="text-orange-500" />
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                disabled={vehicleType.includes('electric')}
              >
                <option value="petrol">⛽ Petrol</option>
                <option value="diesel">🛢️ Diesel</option>
                <option value="cng">💨 CNG</option>
                <option value="electric">⚡ Electric</option>
              </select>
            </div>
          </div>

          <button
            onClick={optimizeRoute}
            disabled={isLoading || !origin || !destination}
            className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Routes...
              </>
            ) : (
              <>
                <Navigation size={20} />
                Find Greenest Route
              </>
            )}
          </button>
        </motion.div>

        {/* Recommendation Banner */}
        {recommendation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Leaf size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{recommendation.message}</h3>
                <div className="flex items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2">
                    <TrendingDown size={18} />
                    Save {recommendation.emissionsSaved} kg CO₂
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign size={18} />
                    Save ₹{recommendation.costSaved}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Routes Comparison Table */}
        {routes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Route</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Time</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Distance</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Fuel Burn</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">CO₂ Emission</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Cost</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Green Score</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {routes.map((route, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 transition-colors ${
                        index === recommendation?.greenestRouteIndex ? 'bg-green-50' : ''
                      } ${selectedRoute === index ? 'ring-2 ring-green-500' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${getRouteColor(route.routeType)} rounded-lg flex items-center justify-center text-white`}>
                            {getRouteIcon(route.routeType)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 capitalize">{route.routeType}</p>
                            {route.trafficLevel && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getTrafficColor(route.trafficLevel)}`}>
                                {route.trafficLevel} traffic
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700">
                          <Clock size={16} />
                          <span className="font-semibold">{route.duration} min</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-700">
                        {route.distance} km
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-700">
                        {route.fuelUsed} L
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold ${
                          index === recommendation?.greenestRouteIndex ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          {route.emissions} kg
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-700">
                        ₹{route.cost}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                              style={{ width: `${route.greenScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-green-600">{route.greenScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => selectRoute(index)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto ${
                            selectedRoute === index
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {selectedRoute === index ? (
                            <>
                              Selected ✓
                            </>
                          ) : (
                            <>
                              <Navigation size={16} />
                              Navigate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
