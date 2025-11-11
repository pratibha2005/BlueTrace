import {
  Settings,
  LayoutDashboard,
  Lightbulb,
  Calculator,
  Award,
  User,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai", icon: Lightbulb, label: "AI Tips" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "badges", icon: Award, label: "Badges" },
  { id: "profile", icon: User, label: "Profile" },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-screen w-[90px] flex flex-col items-center justify-center py-6 bg-white shadow-xl select-none"
    >
      {/* Wavy teal background - centered */}
      <div className="sidebar-inner-centered"></div>

      {/* LOGO - at top */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute top-6 z-20"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group">
          <Leaf className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-200" />
        </div>
      </motion.div>

      {/* NAVIGATION ICONS - centered */}
      <div className="relative z-20 flex flex-col items-center gap-5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * index, duration: 0.2 }}
              className="group relative"
            >
              <button
                onClick={() => onSelect(item.id)}
                className="relative w-14 h-14 flex items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarHighlight"
                    className="absolute w-14 h-14 rounded-2xl bg-white shadow-xl"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative z-30">
                  <Icon
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive 
                        ? "text-teal-600" 
                        : "text-white/90 group-hover:text-white"
                    }`}
                  />
                </div>
              </button>

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SETTINGS - at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 z-20 group"
      >
        <button 
          className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
        >
          <Settings className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
          Settings
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
