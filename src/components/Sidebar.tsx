import {
  LogOut,
  Lightbulb,
  Calculator,
  Award,
  Send,
  LayoutDashboard,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai", icon: Lightbulb, label: "AI Tips" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "badges", icon: Award, label: "Badges" },
  { id: "profile", icon: Send, label: "Profile" },
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
      className="relative h-screen w-[90px] flex flex-col items-center py-8 bg-gradient-to-b from-emerald-600 via-teal-600 to-green-700 shadow-2xl select-none"
      style={{ borderRadius: '0 50px 50px 0' }}
    >
      {/* LOGO - at top */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-12"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm shadow-lg hover:bg-white/30 transition-all duration-200 cursor-pointer group border border-white/30">
          <Leaf className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* NAVIGATION ICONS - centered */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="group relative"
            >
              <button
                onClick={() => onSelect(item.id)}
                className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-white shadow-lg scale-110" 
                    : "hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive 
                      ? "text-green-600" 
                      : "text-white/70 group-hover:text-white"
                  }`}
                />
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

      {/* LOGOUT - at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto group"
      >
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            globalThis.location.href = '/login';
          }}
          className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-6 h-6 text-white/70 group-hover:text-red-400 transition-colors duration-200" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
          Logout
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
