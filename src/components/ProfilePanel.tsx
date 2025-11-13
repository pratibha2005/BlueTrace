// import { User, Leaf, TrendingDown, Calendar, Target, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";

// export const ProfilePanel = ({ stats, isLoading }: any) => {
//   return (
//     <motion.div 
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="w-80 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 backdrop-blur-xl h-screen border-l border-teal-200/30 shadow-2xl p-6 flex flex-col justify-between"
//     >
//       <div>
//         {/* Profile Header */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.3 }}
//           className="flex items-center gap-3 mb-8"
//         >
//           <div className="relative">
//             <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           <div>
//             <h3 className="text-gray-900 font-bold text-lg">Welcome Back</h3>
//             <div className="flex items-center gap-2">
//               <Sparkles className="w-3 h-3 text-amber-500" />
//               <p className="text-gray-600 text-sm font-medium">Eco-Warrior</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Stats Card */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.3 }}
//           className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-6 rounded-3xl text-white shadow-2xl mb-5 relative overflow-hidden cursor-pointer hover:shadow-3xl transition-shadow duration-300"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
//           <div className="relative z-10">
//             <div className="flex items-center gap-2 mb-3">
//               <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
//                 <Leaf className="w-4 h-4" />
//               </div>
//               <h4 className="text-sm font-semibold text-emerald-100">Total Emissions</h4>
//             </div>
//             {isLoading ? (
//               <div className="animate-pulse">
//                 <div className="h-12 bg-white/20 rounded-lg w-32 mb-2"></div>
//               </div>
//             ) : (
//               <>
//                 <p className="text-5xl font-bold mb-1">{stats?.totalEmissions || 0}</p>
//                 <p className="text-sm text-emerald-100 font-medium">kg CO₂ emitted</p>
//                 <div className="mt-4 flex items-center gap-2 text-xs">
//                   <div className="px-2 py-1 bg-white/20 rounded-lg flex items-center gap-1">
//                     <TrendingDown className="w-3 h-3" />
//                     <span>12% less</span>
//                   </div>
//                   <span className="text-emerald-100">vs last month</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>

//         {/* Quick Stats */}
//         <div className="space-y-3 mb-6">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.3 }}
//             className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-100/50 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
//                   <Calendar className="w-4 h-4 text-white" />
//                 </div>
//                 Monthly Impact
//               </h4>
//             </div>
//             <p className="text-gray-900 font-bold text-2xl ml-10">
//               {stats?.monthlyEmissions || "0"} <span className="text-sm font-medium text-gray-600">kg</span>
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.45, duration: 0.3 }}
//             className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100/50 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
//                   <TrendingDown className="w-4 h-4 text-white" />
//                 </div>
//                 Avg per Trip
//               </h4>
//             </div>
//             <p className="text-gray-900 font-bold text-2xl ml-10">
//               {stats?.avgEmissions || "0"} <span className="text-sm font-medium text-gray-600">kg</span>
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.3 }}
//             className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-100/50 hover:shadow-lg hover:border-amber-200 transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
//                   <Target className="w-4 h-4 text-white" />
//                 </div>
//                 Total Trips
//               </h4>
//             </div>
//             <p className="text-gray-900 font-bold text-2xl ml-10">
//               {stats?.totalCalculations || 0} <span className="text-sm font-medium text-gray-600">trips</span>
//             </p>
//           </motion.div>
//         </div>

//         {/* Progress Card */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.55, duration: 0.3 }}
//           className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200/50 hover:border-green-300 transition-all duration-200"
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h4 className="font-bold text-gray-800 text-sm">Monthly Goal</h4>
//             <span className="text-xs font-semibold px-2 py-1 bg-green-200 text-green-700 rounded-lg">73%</span>
//           </div>
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
//             <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
//           </div>
//           <p className="text-xs text-gray-600">Keep going! You're doing great 🎯</p>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6, duration: 0.3 }}
//         className="text-center"
//       >
//         <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl mb-3">
//           <p className="text-xs font-semibold text-emerald-800">🌍 Every trip counts!</p>
//         </div>
//         <p className="text-xs text-gray-400">
//           BlueTrace • Version 1.0
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };





import { User, Leaf, TrendingDown, Calendar, Target, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Stats {
  totalEmissions?: number;
  monthlyEmissions?: number;
  avgEmissions?: number;
  totalCalculations?: number;
}

interface ProfilePanelProps {
  stats: Stats;
  isLoading?: boolean;
  onClose?: () => void;
}

export const ProfilePanel = ({ stats, isLoading, onClose }: ProfilePanelProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-80 h-screen bg-gradient-to-br from-[#f9f9f9]/90 via-[#ecfff8]/60 to-[#e1fff4]/60 
                     backdrop-blur-2xl border-l border-emerald-100/40 shadow-[0_0_50px_-10px_rgba(0,0,0,0.2)] 
                     p-7 flex flex-col justify-between z-50"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors duration-200 z-50"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Header */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600
                                shadow-[0_4px_25px_rgba(0,128,128,0.4)] flex items-center justify-center
                                hover:scale-105 transition-transform duration-200">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Welcome Back</h3>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <p className="text-sm text-gray-600 font-medium">Eco Warrior</p>
                </div>
              </div>
            </motion.div>

            {/* Main Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-6 rounded-3xl text-white 
                         shadow-[0_8px_30px_rgba(0,128,128,0.5)] overflow-hidden cursor-pointer hover:scale-[1.02] 
                         transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-emerald-100">Total Emissions</h4>
                </div>

                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-10 bg-white/20 rounded-lg w-28"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-5xl font-bold mb-1 tracking-tight">{stats?.totalEmissions || 0}</p>
                    <p className="text-sm text-emerald-100/80 font-medium">kg CO₂ emitted</p>
                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <div className="px-2 py-1 bg-white/20 rounded-lg flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        <span>↓ 12%</span>
                      </div>
                      <span className="text-emerald-100/80">vs last month</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="space-y-3 mt-6">
              {[
                {
                  title: "Monthly Impact",
                  icon: Calendar,
                  color: "from-sky-100 to-cyan-50 border-sky-200/50",
                  value: `${stats?.monthlyEmissions || 0} kg`,
                },
                {
                  title: "Avg per Trip",
                  icon: TrendingDown,
                  color: "from-purple-100 to-pink-50 border-purple-200/50",
                  value: `${stats?.avgEmissions || 0} kg`,
                },
                {
                  title: "Total Trips",
                  icon: Target,
                  color: "from-amber-100 to-orange-50 border-amber-200/50",
                  value: `${stats?.totalCalculations || 0} trips`,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`p-4 rounded-2xl border ${item.color} bg-gradient-to-br 
                              hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700">{item.title}</h4>
                  </div>
                  <p className="text-gray-900 font-bold text-2xl ml-12">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200/60 
                         shadow-inner hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-800 text-sm">Monthly Goal</h4>
                <span className="text-xs font-semibold px-2 py-1 bg-green-200 text-green-700 rounded-lg shadow-sm">73%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
                <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-600">Keep going! You’re doing amazing 🌿</p>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-6"
          >
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl mb-3 shadow-sm">
              <p className="text-xs font-semibold text-emerald-800">🌍 Every trip makes Earth greener!</p>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wide">BlueTrace • Version 1.0</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
