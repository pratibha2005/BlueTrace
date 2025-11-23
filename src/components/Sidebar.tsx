import {
  LogOut,
  Lightbulb,
  Calculator,
  Award,
  Send,
  LayoutDashboard,
  Leaf,
  Video,
  Navigation,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai", icon: Lightbulb, label: "AI Tips" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "route-optimizer", icon: Navigation, label: "Route Optimizer" },
  { id: "awareness", icon: Video, label: "Awareness Videos" },
  { id: "badges", icon: Award, label: "Badges" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard", external: true },
  { id: "profile", icon: Send, label: "Profile" },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.external) {
      navigate('/leaderboard');
    } else {
      onSelect(item.id);
    }
    setIsMobileMenuOpen(false); // Close menu on selection
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 xl:hidden w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-40 xl:hidden flex flex-col"
            >
              {/* Mobile Logo */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">BlueTrace</h2>
                </div>
              </div>

              {/* Mobile Nav Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                        isActive 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Logout */}
              <div className="p-4 border-t border-gray-200">
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    globalThis.location.href = '/login';
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden xl:flex relative h-screen flex-col items-center bg-gray-50 shadow-2xl select-none"
      >
      {/* LOGO - at very top */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-shrink-0 pt-4 pb-3 md:pt-6 md:pb-4"
      >
        <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center bg-emerald-100 shadow-lg hover:bg-emerald-200 transition-all duration-200 cursor-pointer">
          <Leaf className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
        </div>
      </motion.div>

      {/* NAVIGATION SECTION - centered with gradient background */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-1.5 md:gap-3">
        {/* Curved gradient background for navigation icons */}
        <div 
          className="absolute bg-gradient-to-b from-emerald-600 via-teal-600 to-green-700 z-0 rounded-r-[50px] md:rounded-r-[80px] -left-3 right-0 top-4 bottom-4 w-[calc(100%+12px)] md:-left-5 md:top-[26px] md:bottom-[26px] md:w-[calc(100%+20px)]" 
        ></div>
        
        {/* Navigation Items */}
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isFirst = index === 0;
          const isLast = index === navItems.length - 1;
          
          let roundedClass = 'rounded-lg md:rounded-xl';
          if (isActive) {
            if (isFirst) {
              roundedClass = 'rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-lg md:rounded-tl-xl md:rounded-tr-xl md:rounded-bl-none md:rounded-br-xl';
            } else if (isLast) {
              roundedClass = 'rounded-tl-lg rounded-tr-none rounded-bl-lg rounded-br-lg md:rounded-tl-xl md:rounded-tr-none md:rounded-bl-xl md:rounded-br-xl';
            }
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="group relative z-10"
            >
              <button
                onClick={() => handleNavClick(item)}
                className={`relative w-9 h-9 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? `bg-white shadow-lg scale-105 md:scale-110 ${roundedClass}` 
                    : `hover:bg-white/10 ${roundedClass}`
                }`}
              >
                <Icon
                  className={`w-4 h-4 md:w-6 md:h-6 transition-all duration-200 ${
                    isActive 
                      ? "text-green-600" 
                      : "text-white/70 group-hover:text-white"
                  }`}
                />
              </button>

              {/* Tooltip - Hidden on mobile */}
              <div className="hidden md:block absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
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
        className="group relative z-10 flex-shrink-0 pb-4 pt-3 md:pb-6 md:pt-4"
      >
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            globalThis.location.href = '/login';
          }}
          className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 md:w-6 md:h-6 text-gray-600 group-hover:text-red-400 transition-colors duration-200" />
        </button>
        
        {/* Tooltip - Hidden on mobile */}
        <div className="hidden md:block absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-50">
          Logout
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
};
