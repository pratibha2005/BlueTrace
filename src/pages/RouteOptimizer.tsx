import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Fuel, Leaf, Clock, TrendingDown, Award, Zap, DollarSign, Sparkles, CheckCircle } from 'lucide-react';
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
  const [dataSource, setDataSource] = useState<string>('');
  const [warning, setWarning] = useState<string>('');

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
        setDataSource(response.dataSource || 'unknown');
        setWarning(response.warning || '');
        
        // Log data source to console
        if (response.dataSource === 'osrm_api') {
          console.log('✅ Using real-time OSRM data (100% FREE)');
        } else {
          console.log('⚠️ Using sample fallback data');
        }
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div 
              animate={{ rotate: window.innerWidth >= 768 ? [0, 360] : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <Navigation className="text-white" size={36} />
            </motion.div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                AI Route Optimizer
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <p className="text-gray-700 text-lg font-semibold">Find the greenest route and save CO₂ with every journey</p>
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Navigation className="text-white" size={24} />
                </div>
                <p className="text-sm text-blue-100 font-medium mb-1">Total Trips</p>
                <p className="text-4xl font-black text-white">{stats.totalTrips}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="text-white" size={24} />
                </div>
                <p className="text-sm text-green-100 font-medium mb-1">Green Routes</p>
                <p className="text-4xl font-black text-white">{stats.greenRoutesChosen}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <TrendingDown className="text-white" size={24} />
                </div>
                <p className="text-sm text-emerald-100 font-medium mb-1">CO₂ Saved</p>
                <p className="text-4xl font-black text-white">{stats.totalEmissionsSaved}</p>
                <p className="text-xs text-emerald-100 mt-1">kilograms</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <Award className="text-white" size={24} />
                </div>
                <p className="text-sm text-purple-100 font-medium mb-1">Eco Score</p>
                <p className="text-4xl font-black text-white">{stats.ecoScore}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-green-100"
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

          <motion.button
            onClick={optimizeRoute}
            disabled={isLoading || !origin || !destination}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Analyzing Routes...</span>
              </>
            ) : (
              <>
                <Navigation size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="text-lg">Find Greenest Route</span>
                <Leaf size={20} className="text-green-200" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Data Source Indicator */}
        {warning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Sparkles size={20} className="text-yellow-600" />
            </div>
            <p className="text-yellow-800 font-medium">{warning}</p>
          </motion.div>
        )}

        {/* {dataSource === 'osrm_api' && routes.length > 0 && (
        
        )} */}

        {/* Enhanced Recommendation Banner */}
        {recommendation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 mb-10 text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-6">
              <motion.div 
                animate={{ rotate: window.innerWidth >= 768 ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-xl"
              >
                <Leaf size={40} />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-3xl font-black mb-3 flex items-center gap-2">
                  {recommendation.message}
                  <Sparkles size={24} className="text-yellow-300" />
                </h3>
                <div className="flex items-center gap-8 text-lg">
                  <span className="flex items-center gap-2 font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                    <TrendingDown size={20} />
                    Save {recommendation.emissionsSaved} kg CO₂
                  </span>
                  <span className="flex items-center gap-2 font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                    <DollarSign size={20} />
                    Save ₹{recommendation.costSaved}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Routes Comparison Table */}
        {routes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-green-100"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b-2 border-green-200">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-black text-gray-800 uppercase tracking-wide">Route</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Time</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Distance</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Fuel Burn</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">CO₂ Emission</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Cost</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Green Score</th>
                    <th className="px-6 py-5 text-center text-sm font-black text-gray-800 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {routes.map((route, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 ${
                        index === recommendation?.greenestRouteIndex ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''
                      } ${selectedRoute === index ? 'ring-2 ring-green-500 bg-green-100' : ''}`}
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
                        <motion.button
                          onClick={() => selectRoute(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl ${
                            selectedRoute === index
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                          }`}
                        >
                          {selectedRoute === index ? (
                            <>
                              <CheckCircle size={18} />
                              Selected
                            </>
                          ) : (
                            <>
                              <Navigation size={18} />
                              Navigate
                            </>
                          )}
                        </motion.button>
                      </td>
                    </motion.tr>
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
