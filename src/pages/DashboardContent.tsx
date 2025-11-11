import { Overview } from "../components/sections/Overview";
import { CalculatorSection } from "../components/sections/CalculatorSection";
import { AISuggestions } from "../components/sections/AISuggestions";

interface DashboardContentProps {
  active: string;
}

export const DashboardContent = ({ active }: DashboardContentProps) => {
  return (
    <div className="w-full h-full">
      {active === "overview" && <Overview />}
      {active === "ai" && <AISuggestions />}
      {active === "calculator" && <CalculatorSection />}
    </div>
  );
};
