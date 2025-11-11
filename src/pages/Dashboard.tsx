import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ProfilePanel } from "../components/ProfilePanel";
import { motion, AnimatePresence } from "framer-motion";
import { Dashboard as DashboardContent } from "../pages/DashboardContent"; // rename your current dashboard code to this file later

export const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar active={activeSection} onSelect={setActiveSection} />

      <main className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DashboardContent />
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfilePanel stats={stats} />

    </div>
  );
};
