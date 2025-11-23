import { User, Leaf, TrendingDown, Calendar, Target, Sparkles, X, ChevronRight, Mail, MapPin, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ProfilePanelProps {
  stats?: {
    totalEmissions?: number;
    monthlyEmissions?: number;
    avgPerTrip?: number;
    totalTrips?: number;
  };
  isLoading?: boolean;
  onProfileClick?: () => void;
}

export const ProfilePanel = ({ stats, isLoading, onProfileClick }: ProfilePanelProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState({ 
    name: 'User', 
    email: '', 
    location: '',
    avatar: '' 
  });

  useEffect(() => {
    // Load user data from localStorage
    const loadUserData = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData({ 
        name: user.name || 'User', 
        email: user.email || '',
        location: user.location || 'Not set',
        avatar: user.avatar || ''
      });
    };
    
    loadUserData();
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      loadUserData();
    };
    
    globalThis.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      globalThis.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  if (!isOpen) {
    return (
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-emerald-500 to-teal-600 text-white p-4 rounded-l-2xl shadow-xl hover:shadow-2xl transition-all duration-300 z-40 hover:pr-5"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 384, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 384, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden xl:flex w-80 2xl:w-96 bg-gradient-to-br from-white via-gray-50/50 to-emerald-50/30 backdrop-blur-2xl h-screen border-l border-gray-200/50 shadow-2xl flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-10 p-2.5 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg group"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 lg:py-8 space-y-4 lg:space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center pt-2"
          >
            <div className="relative mb-5">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-emerald-100"
                />
              ) : (
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-emerald-100">
                  <User className="w-14 h-14 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg">
                <div className="w-full h-full rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 max-w-full truncate px-4">{userData.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <p className="text-amber-700 font-bold text-sm">Eco-Warrior</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600 mb-5 w-full px-4">
              {userData.email && (
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{userData.email}</span>
                </div>
              )}
              {userData.location && userData.location !== 'Not set' && (
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{userData.location}</span>
                </div>
              )}
            </div>
            <button
              onClick={onProfileClick}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </motion.div>

          {/* Main Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden group hover:shadow-emerald-500/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wide truncate">Total Impact</h4>
                  <p className="text-xs text-white/70 truncate">Carbon Footprint</p>
                </div>
              </div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-14 bg-white/20 rounded-2xl w-36 mb-3"></div>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-5xl font-extrabold mb-1">{stats?.totalEmissions || 0}</p>
                    <p className="text-sm text-white/90 font-semibold">kg CO₂ emitted</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs pt-3 border-t border-white/20 flex-wrap">
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl flex items-center gap-1.5 shadow-sm">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span className="font-bold">12% less</span>
                    </div>
                    <span className="text-white/90 font-medium">vs last month</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm truncate">Monthly Impact</h4>
                  <p className="text-xs text-gray-500 truncate">This month</p>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 truncate">
                {stats?.monthlyEmissions || "0"}<span className="text-base font-semibold text-gray-500 ml-1.5">kg</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm truncate">Avg per Trip</h4>
                  <p className="text-xs text-gray-500 truncate">Average</p>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 truncate">
                {stats?.avgPerTrip || "0"}<span className="text-base font-semibold text-gray-500 ml-1.5">kg</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm truncate">Total Trips</h4>
                  <p className="text-xs text-gray-500 truncate">All time</p>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 truncate">
                {stats?.totalTrips || 0}<span className="text-base font-semibold text-gray-500 ml-1.5">trips</span>
              </p>
            </motion.div>
          </div>

          {/* Monthly Goal Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 min-w-0 mr-3">
                <h4 className="font-bold text-gray-800 text-base truncate">Monthly Goal</h4>
                <p className="text-xs text-gray-500 mt-0.5 truncate">Track your progress</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xl font-extrabold text-green-600">{stats?.totalTrips || 0}</span>
                <p className="text-xs text-gray-500">Trips</p>
              </div>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-3">
              <div 
                className="absolute inset-0 h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full"
                style={{ width: `${Math.min((stats?.totalTrips || 0) * 10, 100)}%` }}
              ></div>
              <div 
                className="absolute inset-0 h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full animate-pulse opacity-50"
                style={{ width: `${Math.min((stats?.totalTrips || 0) * 10, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-center text-gray-700 font-semibold">
              {(stats?.totalTrips || 0) > 0 ? 'Keep going! 🎯' : 'Start tracking your trips! 🚀'}
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-200 p-5 text-center bg-gradient-to-t from-emerald-50/30 to-transparent"
        >
          <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <p className="text-sm font-bold text-emerald-700 mb-0.5">🌍 Every trip counts!</p>
            <p className="text-xs text-gray-600">Making a difference together</p>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            BlueTrace • v1.0.0
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
