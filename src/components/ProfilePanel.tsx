import { User, Leaf, TrendingDown, Calendar, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const ProfilePanel = ({ stats, isLoading }: any) => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-80 bg-gradient-to-b from-emerald-300 via-teal-300 to-green-400 h-screen shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
      <div>
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center gap-3 mb-8 relative z-10"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-white">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg drop-shadow-lg">Welcome Back</h3>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <p className="text-white/90 text-sm font-medium drop-shadow">Eco-Warrior</p>
            </div>
          </div>
        </motion.div>

        {/* Main Stats Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl mb-5 relative overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-white/50 z-10"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-emerald-400/20 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-emerald-700">Total Emissions</h4>
            </div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-emerald-100 rounded-lg w-32 mb-2"></div>
              </div>
            ) : (
              <>
                <p className="text-5xl font-bold mb-1 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{stats?.totalEmissions || 0}</p>
                <p className="text-sm text-gray-600 font-medium">kg CO₂ emitted</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg flex items-center gap-1 shadow-md">
                    <TrendingDown className="w-3 h-3" />
                    <span>12% less</span>
                  </div>
                  <span className="text-gray-600 font-medium">vs last month</span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="space-y-3 mb-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                Monthly Impact
              </h4>
            </div>
            <p className="text-gray-900 font-bold text-2xl ml-10">
              {stats?.monthlyEmissions || "0"} <span className="text-sm font-medium text-gray-600">kg</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                Avg per Trip
              </h4>
            </div>
            <p className="text-gray-900 font-bold text-2xl ml-10">
              {stats?.avgEmissions || "0"} <span className="text-sm font-medium text-gray-600">kg</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                  <Target className="w-4 h-4 text-white" />
                </div>
                Total Trips
              </h4>
            </div>
            <p className="text-gray-900 font-bold text-2xl ml-10">
              {stats?.totalCalculations || 0} <span className="text-sm font-medium text-gray-600">trips</span>
            </p>
          </motion.div>
        </div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 relative z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-800 text-sm">Monthly Goal</h4>
            <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-md">73%</span>
          </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
            <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-600">Keep going! You're doing great 🎯</p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl mb-3">
          <p className="text-xs font-semibold text-emerald-800">🌍 Every trip counts!</p>
        </div>
        <p className="text-xs text-gray-400">
          BlueTrace • Version 1.0
        </p>
      </motion.div>
    </motion.div>
  );
};
