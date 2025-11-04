import { User, Leaf } from "lucide-react";

export const ProfilePanel = ({ stats }: any) => {
  return (
    <div className="w-80 bg-white h-screen border-l border-gray-100 shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-gray-800 font-bold">Welcome Back 👋</h3>
            <p className="text-gray-500 text-sm">Eco-Warrior</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl text-white shadow-md mb-4">
          <h4 className="text-lg font-semibold mb-1">Total Emissions</h4>
          <p className="text-4xl font-bold">{stats?.totalEmissions || 0}</p>
          <p className="text-sm text-emerald-100">kg CO₂</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-600" /> Monthly Emission
          </h4>
          <p className="text-gray-900 font-bold text-xl">
            {stats?.monthlyEmissions || "0"} kg
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        🌿 Keep reducing your footprint!
      </p>
    </div>
  );
};
