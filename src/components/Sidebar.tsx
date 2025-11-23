import {
  LogOut,
  Lightbulb,
  Calculator,
  Award,
  Send,
  LayoutDashboard,
  Leaf,
  Video,
  Bot,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai", icon: Lightbulb, label: "AI Tips" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "route-optimizer", icon: Navigation, label: "Route Optimizer" },
  { id: "awareness", icon: Video, label: "Awareness Videos" },
  { id: "badges", icon: Award, label: "Badges" },
  { id: "profile", icon: Send, label: "Profile" },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  const isFirstActive = active === navItems[0].id;
  const isLastActive = active === navItems[navItems.length - 1].id;

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-screen flex flex-col items-center bg-gray-50 shadow-2xl select-none"
    >
      {/* LOGO - at very top */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-shrink-0 pt-6 pb-4"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-100 shadow-lg hover:bg-emerald-200 transition-all duration-200 cursor-pointer group">
          <Leaf className="w-6 h-6 text-emerald-600" />
        </div>
      </motion.div>

      {/* NAVIGATION SECTION - centered with gradient background */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-3">
        {/* Curved gradient background for navigation icons */}
        <div className="absolute bg-gradient-to-b from-emerald-600 via-teal-600 to-green-700 z-0" style={{ 
          borderRadius: '0 80px 80px 0', 
          left: '-20px', 
          right: '0', 
          top: '26px', 
          bottom: '26px', 
          paddingLeft: '20px',
          width: 'calc(100% + 20px)'
        }}></div>
        
        {/* Navigation Items */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isFirst = index === 0;
          const isLast = index === navItems.length - 1;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="group relative z-10"
            >
              <button
                onClick={() => onSelect(item.id)}
                className={`relative w-12 h-12 flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? `bg-white shadow-lg scale-110 ${
                        isFirst ? 'rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-xl' : 
                        isLast ? 'rounded-tl-xl rounded-tr-none rounded-bl-xl rounded-br-xl' : 
                        'rounded-xl'
                      }` 
                    : "hover:bg-white/10 rounded-xl"
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
        className="group relative z-10 flex-shrink-0 pb-6 pt-4"
      >
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            globalThis.location.href = '/login';
          }}
          className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-6 h-6 text-gray-600 group-hover:text-red-400 transition-colors duration-200" />
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

// Side bar intehgerandga
