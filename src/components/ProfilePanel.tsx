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





// import { User, Leaf, TrendingDown, Calendar, Target, Sparkles, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// interface Stats {
//   totalEmissions?: number;
//   monthlyEmissions?: number;
//   avgEmissions?: number;
//   totalCalculations?: number;
// }

// interface ProfilePanelProps {
//   stats: Stats;
//   isLoading?: boolean;
//   onClose?: () => void;
// }

// export const ProfilePanel = ({ stats, isLoading, onClose }: ProfilePanelProps) => {
//   const [visible, setVisible] = useState(true);

//   const handleClose = () => {
//     setVisible(false);
//     if (onClose) onClose();
//   };

//   return (
// <<<<<<< hitesh
//     <motion.div 
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="w-80 bg-gradient-to-b from-emerald-300 via-teal-300 to-green-400 h-screen shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden"
//     >
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
//       <div>
//         {/* Profile Header */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.3 }}
//           className="flex items-center gap-3 mb-8 relative z-10"
//         >
//           <div className="relative">
//             <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-white">
//               <User className="w-8 h-8 text-emerald-600" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//           </div>
//           <div>
//             <h3 className="text-white font-bold text-lg drop-shadow-lg">Welcome Back</h3>
//             <div className="flex items-center gap-2">
//               <Sparkles className="w-3 h-3 text-yellow-300" />
//               <p className="text-white/90 text-sm font-medium drop-shadow">Eco-Warrior</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Stats Card */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.3 }}
//           className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-2xl mb-5 relative overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-white/50 z-10"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-emerald-400/20 rounded-full -ml-12 -mb-12"></div>
          
//           <div className="relative z-10">
//             <div className="flex items-center gap-2 mb-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
//                 <Leaf className="w-4 h-4 text-white" />
//               </div>
//               <h4 className="text-sm font-semibold text-emerald-700">Total Emissions</h4>
//             </div>
//             {isLoading ? (
//               <div className="animate-pulse">
//                 <div className="h-12 bg-emerald-100 rounded-lg w-32 mb-2"></div>
//               </div>
//             ) : (
//               <>
//                 <p className="text-5xl font-bold mb-1 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{stats?.totalEmissions || 0}</p>
//                 <p className="text-sm text-gray-600 font-medium">kg CO₂ emitted</p>
//                 <div className="mt-4 flex items-center gap-2 text-xs">
//                   <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg flex items-center gap-1 shadow-md">
//                     <TrendingDown className="w-3 h-3" />
//                     <span>12% less</span>
//                   </div>
//                   <span className="text-gray-600 font-medium">vs last month</span>
// =======
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ x: 300, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: 300, opacity: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="relative w-80 h-screen bg-gradient-to-br from-[#f9f9f9]/90 via-[#ecfff8]/60 to-[#e1fff4]/60 
//                      backdrop-blur-2xl border-l border-emerald-100/40 shadow-[0_0_50px_-10px_rgba(0,0,0,0.2)] 
//                      p-7 flex flex-col justify-between z-50"
//         >
//           {/* Close Button */}
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 90 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={handleClose}
//             className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors duration-200 z-50"
//           >
//             <X className="w-5 h-5" />
//           </motion.button>

//           {/* Header */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center gap-4 mb-10"
//             >
//               <div className="relative">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600
//                                 shadow-[0_4px_25px_rgba(0,128,128,0.4)] flex items-center justify-center
//                                 hover:scale-105 transition-transform duration-200">
//                   <User className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">Welcome Back</h3>
//                 <div className="flex items-center gap-1">
//                   <Sparkles className="w-3 h-3 text-amber-400" />
//                   <p className="text-sm text-gray-600 font-medium">Eco Warrior</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Main Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-6 rounded-3xl text-white 
//                          shadow-[0_8px_30px_rgba(0,128,128,0.5)] overflow-hidden cursor-pointer hover:scale-[1.02] 
//                          transition-transform duration-300"
//             >
//               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>
//               <div className="relative z-10">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
//                     <Leaf className="w-4 h-4" />
//                   </div>
//                   <h4 className="text-sm font-semibold text-emerald-100">Total Emissions</h4>
// >>>>>>> main
//                 </div>

// <<<<<<< hitesh
//         {/* Quick Stats */}
//         <div className="space-y-3 mb-6 relative z-10">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.3 }}
//             className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
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
//             className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
//                   <TrendingDown className="w-4 h-4 text-white" />
//                 </div>
//                 Avg per Trip
//               </h4>
// =======
//                 {isLoading ? (
//                   <div className="animate-pulse">
//                     <div className="h-10 bg-white/20 rounded-lg w-28"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-5xl font-bold mb-1 tracking-tight">{stats?.totalEmissions || 0}</p>
//                     <p className="text-sm text-emerald-100/80 font-medium">kg CO₂ emitted</p>
//                     <div className="mt-4 flex items-center gap-2 text-xs">
//                       <div className="px-2 py-1 bg-white/20 rounded-lg flex items-center gap-1">
//                         <TrendingDown className="w-3 h-3" />
//                         <span>↓ 12%</span>
//                       </div>
//                       <span className="text-emerald-100/80">vs last month</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>

//             {/* Quick Stats */}
//             <div className="space-y-3 mt-6">
//               {[
//                 {
//                   title: "Monthly Impact",
//                   icon: Calendar,
//                   color: "from-sky-100 to-cyan-50 border-sky-200/50",
//                   value: `${stats?.monthlyEmissions || 0} kg`,
//                 },
//                 {
//                   title: "Avg per Trip",
//                   icon: TrendingDown,
//                   color: "from-purple-100 to-pink-50 border-purple-200/50",
//                   value: `${stats?.avgEmissions || 0} kg`,
//                 },
//                 {
//                   title: "Total Trips",
//                   icon: Target,
//                   color: "from-amber-100 to-orange-50 border-amber-200/50",
//                   value: `${stats?.totalCalculations || 0} trips`,
//                 },
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 + i * 0.1 }}
//                   className={`p-4 rounded-2xl border ${item.color} bg-gradient-to-br 
//                               hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md">
//                       <item.icon className="w-4 h-4 text-white" />
//                     </div>
//                     <h4 className="text-sm font-semibold text-gray-700">{item.title}</h4>
//                   </div>
//                   <p className="text-gray-900 font-bold text-2xl ml-12">{item.value}</p>
//                 </motion.div>
//               ))}
// >>>>>>> main
//             </div>

// <<<<<<< hitesh
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.3 }}
//             className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
//                 <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
//                   <Target className="w-4 h-4 text-white" />
//                 </div>
//                 Total Trips
//               </h4>
// =======
//             {/* Progress Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200/60 
//                          shadow-inner hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="font-bold text-gray-800 text-sm">Monthly Goal</h4>
//                 <span className="text-xs font-semibold px-2 py-1 bg-green-200 text-green-700 rounded-lg shadow-sm">73%</span>
//               </div>
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
//                 <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
//               </div>
//               <p className="text-xs text-gray-600">Keep going! You’re doing amazing 🌿</p>
//             </motion.div>
//           </div>

//           {/* Footer */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="text-center mt-6"
//           >
//             <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-xl mb-3 shadow-sm">
//               <p className="text-xs font-semibold text-emerald-800">🌍 Every trip makes Earth greener!</p>
// >>>>>>> main
//             </div>
//             <p className="text-[10px] text-gray-400 tracking-wide">BlueTrace • Version 1.0</p>
//           </motion.div>
// <<<<<<< hitesh
//         </div>

//         {/* Progress Card */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.55, duration: 0.3 }}
//           className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 relative z-10"
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h4 className="font-bold text-gray-800 text-sm">Monthly Goal</h4>
//             <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-md">73%</span>
//           </div>
//               <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 shadow-inner">
//             <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
//           </div>
//           <p className="text-xs text-gray-600">Keep going! You're doing great 🎯</p>
// =======
// >>>>>>> main
//         </motion.div>
//       )}
//     </AnimatePresence>
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

/**
 * Glassmorphic Profile Panel (narrower, frosted glass background)
 * Updated: inner content uses dark text for improved readability.
 */
export const ProfilePanel = ({ stats, isLoading, onClose }: ProfilePanelProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleOpen = () => setVisible(true);

  // Helper to format numbers nicely
  const fmt = (n?: number) => (n ?? 0).toLocaleString();

  return (
    <>
      {/* Re-open button (visible only when panel is closed) */}
      <AnimatePresence>
        {!visible && (
          <motion.button
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleOpen}
            aria-label="Open profile panel"
            title="Open profile"
            className="fixed top-4 right-4 z-50 inline-flex items-center justify-center w-11 h-11 rounded-lg
                       bg-white/30 backdrop-blur-md border border-white/20 text-gray-800 focus:outline-none
                       hover:bg-white/40 transition"
          >
            <User className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Profile panel"
            className="fixed top-0 right-0 z-40 h-screen w-80 max-w-full
                       bg-gradient-to-br from-white/12 via-white/10 to-white/12
                       backdrop-blur-xl border-l border-white/12
                       p-6 flex flex-col justify-between rounded-l-2xl"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/25 backdrop-blur-sm border border-white/12 flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold">Welcome back</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Eco-Warrior</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleClose}
                    aria-label="Close profile panel"
                    title="Close"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white/30 backdrop-blur-sm
                               border border-white/12 text-gray-700 focus:outline-none hover:bg-white/40 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main card (glass, slightly more opaque for contrast) */}
              <section className="rounded-2xl p-4
                                 bg-white/60 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50/60 border border-emerald-100/40 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-800 font-medium">Total Emissions</h4>
                    <p className="mt-1 text-xs text-gray-600">Cumulative kg CO₂</p>
                  </div>
                </div>

                <div className="mt-3">
                  {isLoading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-7 bg-gray-200 rounded w-36"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-semibold text-gray-900">
                        {fmt(stats?.totalEmissions)}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs">
                          <TrendingDown className="w-3 h-3" />
                          <span>12% less</span>
                        </div>
                        <span>vs last month</span>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Grid stats */}
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1 rounded-lg p-3 flex items-center gap-3
                                  bg-white/60 border border-white/16">
                    <div className="w-9 h-9 rounded-md bg-teal-50/60 border border-teal-100/30 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-600">Monthly</div>
                      <div className="text-gray-900 font-semibold">{fmt(stats?.monthlyEmissions)} kg</div>
                    </div>
                  </div>

                  <div className="col-span-1 rounded-lg p-3 flex items-center gap-3
                                  bg-white/60 border border-white/16">
                    <div className="w-9 h-9 rounded-md bg-emerald-50/60 border border-emerald-100/30 flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-600">Avg / Trip</div>
                      <div className="text-gray-900 font-semibold">{fmt(stats?.avgEmissions)} kg</div>
                    </div>
                  </div>

                  <div className="col-span-1 rounded-lg p-3 flex items-center gap-3
                                  bg-white/60 border border-white/16">
                    <div className="w-9 h-9 rounded-md bg-amber-50/60 border border-amber-100/30 flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-600">Trips</div>
                      <div className="text-gray-900 font-semibold">{fmt(stats?.totalCalculations)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-2xl p-4 bg-white/60 border border-white/16">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-800">Monthly Goal</div>
                  <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-md">73%</div>
                </div>

                <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden mt-2">
                  {/* Frosted progress bar with subtle gradient */}
                  <div
                    className="h-full rounded-full"
                    style={{ width: "73%", background: "linear-gradient(90deg,#06b6d4,#06d6a0)" }}
                    aria-hidden
                  ></div>
                </div>

                <p className="mt-2 text-xs text-gray-600">Keep going — small changes add up 🌿</p>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-4">
              <div className="text-center text-sm text-gray-700">
                <span>🌍 Every trip matters — BlueTrace v1.0</span>
              </div>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};





