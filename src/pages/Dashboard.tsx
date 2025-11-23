import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { ProfilePanel } from "../components/ProfilePanel";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardContent } from "../pages/DashboardContent";
import { calculatorAPI } from "../services/api";

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    calculatorAPI.getStats()
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      
      <Sidebar active={activeSection} onSelect={setActiveSection} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <DashboardContent active={activeSection} />
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfilePanel 
        stats={stats} 
        isLoading={isLoading}
        onProfileClick={() => setActiveSection("profile")}
      />

    </div>
  );
};
