import { Overview } from "../components/sections/Overview";
import { CalculatorSection } from "../components/sections/CalculatorSection";
import { AISuggestions } from "../components/sections/AISuggestions";
import { AwarenessVideos } from "../components/sections/AwarenessVideos";
import RouteOptimizer from "./RouteOptimizer";
import EcoBot from "../components/EcoBot";

interface DashboardContentProps {
  active: string;
}

export const DashboardContent = ({ active }: DashboardContentProps) => {
  return (
    <div className="w-full h-full">
      {active === "overview" && <Overview />}
      {active === "ai" && <AISuggestions />}
      {active === "calculator" && <CalculatorSection />}
      {active === "route-optimizer" && <RouteOptimizer />}
      {active === "awareness" && <AwarenessVideos />}
      
      {/* EcoBot is always available as floating button */}
      <EcoBot />
    </div>
  );
};
