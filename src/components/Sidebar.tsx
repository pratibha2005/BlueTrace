import { useState } from "react";
import { LayoutDashboard, Lightbulb, Calculator, Award, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "ai", icon: Lightbulb, label: "AI Suggestions" },
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "badges", icon: Award, label: "Badges" },
  { id: "profile", icon: User, label: "Profile" },
];

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

export const Sidebar = ({ active, onSelect }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 200 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-xl h-screen p-4 flex flex-col justify-between border-r border-gray-100"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold text-emerald-600 ${collapsed ? "hidden" : "block"}`}>
            EcoTrack
          </h2>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-emerald-600 transition-colors"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all
                  ${isActive ? "bg-emerald-100 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : ""}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
