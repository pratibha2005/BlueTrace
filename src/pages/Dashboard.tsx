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
    <div className="flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 h-screen overflow-hidden">
      
      <Sidebar active={activeSection} onSelect={setActiveSection} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="h-full"
          >
            <DashboardContent active={activeSection} />
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfilePanel stats={stats} isLoading={isLoading} />

    </div>
  );
};
