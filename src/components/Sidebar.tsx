// import { useState } from "react";
// import { LayoutDashboard, Lightbulb, Calculator, Award, User } from "lucide-react";
// import { motion } from "framer-motion";

// const navItems = [
//   { id: "overview", icon: LayoutDashboard, label: "Overview" },
//   { id: "ai", icon: Lightbulb, label: "AI Suggestions" },
//   { id: "calculator", icon: Calculator, label: "Calculator" },
//   { id: "badges", icon: Award, label: "Badges" },
//   { id: "profile", icon: User, label: "Profile" },
// ];

// interface SidebarProps {
//   active: string;
//   onSelect: (id: string) => void;
// }

// export const Sidebar = ({ active, onSelect }: SidebarProps) => {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <motion.div
//       animate={{ width: collapsed ? 80 : 200 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white shadow-xl h-screen p-4 flex flex-col justify-between border-r border-gray-100"
//     >
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className={`text-xl font-bold text-emerald-600 ${collapsed ? "hidden" : "block"}`}>
//             EcoTrack
//           </h2>
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-gray-400 hover:text-emerald-600 transition-colors"
//           >
//             {collapsed ? "»" : "«"}
//           </button>
//         </div>

//         <div className="space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = active === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => onSelect(item.id)}
//                 className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all
//                   ${isActive ? "bg-emerald-100 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}
//                 `}
//               >
//                 <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : ""}`} />
//                 {!collapsed && <span>{item.label}</span>}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </motion.div>
//   );
// };




import { useState } from 'react';
import {
  Settings,
  LayoutDashboard,
  MessageSquare,
  Send,
  FileText,
  Bookmark,
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'send', icon: Send, label: 'Send' },
  { id: 'file', icon: FileText, label: 'Files' },
  { id: 'save', icon: Bookmark, label: 'Saved' },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  
  // Sidebar ki width ko image ke hisaab se set kiya
  const sidebarWidth = 'w-[80px]'; 

  // Nav item container ki styling jismein active item ki curve/glow show hogi
  const NavItem = ({ item, isActive, onSelect }) => {
    const Icon = item.icon;
    
    // Position adjust ki hai taaki woh curved background mein accha lage
    return (
        <div className="relative w-full h-14 flex items-center justify-center">
            <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="relative z-20 w-10 h-10 flex items-center justify-center p-2 rounded-xl group"
            >
                {/* Active Icon Background (White Circle/Square jaisa image mein hai) */}
                {isActive && (
                    <motion.div
                        layoutId="activeIconBg"
                        className="absolute inset-0 bg-white rounded-xl shadow-lg"
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                        }}
                    />
                )}
                
                {/* Icon */}
                <Icon
                    className={`w-6 h-6 transition-colors relative z-30 ${
                        isActive
                            ? 'text-purple-600' // Active: Purple icon
                            : 'text-white/80 group-hover:text-white' // Inactive: White icon
                    }`}
                />
            </button>
            
            {/* Right side curve/indent effect - Active state mein white curve dikhegi */}
            {isActive && (
                <>
                    {/* Top curve - box shadow use kiya hai corner curve banane ke liye */}
                    <div className="absolute top-0 right-0 w-3 h-7 bg-white"></div>
                    <div className="absolute top-0 right-0 w-3 h-7 rounded-br-2xl bg-purple-600 shadow-[0_5px_0_0_#fff]"></div>
                    
                    {/* Bottom curve */}
                    <div className="absolute bottom-0 right-0 w-3 h-7 bg-white"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-7 rounded-tr-2xl bg-purple-600 shadow-[0_-5px_0_0_#fff]"></div>
                </>
            )}
        </div>
    );
  };

  return (
    // Outer div for sidebar structure
    <div className={`relative h-screen ${sidebarWidth} flex flex-col items-center py-6 pr-0 overflow-hidden`}>
      
      {/* Curved Background with Gradient (Image jaisa) */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-purple-600">
        <svg
          className="absolute inset-y-0 right-0 w-full h-full"
          viewBox={`0 0 ${80} 800`}
          preserveAspectRatio="none"
        >
          {/* Main shape path for the curved left edge */}
          <path
            d={`M${80},0 L0,0 L0,800 L${80},800 Q40,750 30,700 T30,600 T30,500 T30,400 T30,300 T30,200 T30,100 Q40,50 ${80},0 Z`}
            fill="rgba(0, 0, 0, 0.1)" // Thoda dark shade for subtle effect
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
        <div className="flex flex-col items-center space-y-10 w-full">
          
          {/* Logo Area (Top Left 'A' jaisa) */}
          <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl mb-4">
             <span className="text-white text-2xl font-bold">A</span>
          </div>

          {/* Navigation Items - space-y adjust kiya */}
          <div className="flex flex-col items-center space-y-2 w-full">
            {navItems.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={active === item.id} 
                onSelect={onSelect} 
              />
            ))}
          </div>
        </div>

        {/* Bottom Settings Icon */}
        <button className="text-white/80 hover:text-white transition-colors p-2 mt-auto">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};




