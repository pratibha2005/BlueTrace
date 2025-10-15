import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingDown, Award, Lightbulb, Activity } from 'lucide-react';
import { calculatorAPI, suggestionsAPI, badgeAPI } from '../services/api';

interface Stats {
  totalEmissions: string;
  avgEmissions: string;
  monthlyEmissions: string;
  totalCalculations: number;
  vehicleBreakdown: Record<string, number>;
}

interface Suggestion {
  title: string;
  description: string;
  priority: string;
  icon: string;
}

interface Badge {
  name: string;
  description: string;
  dateEarned: string;
  emissionReduction: number;
}

interface Emission {
  date: string;
  co2Emissions: number;
  vehicleType: string;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [history, setHistory] = useState<Emission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, suggestionsData, badgesData, historyData] = await Promise.all([
          calculatorAPI.getStats(),
          suggestionsAPI.getSuggestions(),
          badgeAPI.getBadges(),
          calculatorAPI.getHistory()
        ]);

        setStats(statsData);
        setSuggestions(suggestionsData);
        setBadges(badgesData);
        setHistory(historyData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const chartData = history.slice(0, 10).reverse().map((emission, index) => ({
    name: `Trip ${index + 1}`,
    emissions: emission.co2Emissions
  }));

  const vehicleData = stats?.vehicleBreakdown
    ? Object.entries(stats.vehicleBreakdown).map(([vehicle, emissions]) => ({
        vehicle,
        emissions
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Activity className="w-8 h-8" />}
            title="Total Emissions"
            value={`${stats?.totalEmissions || 0} kg`}
            color="bg-red-500"
          />
          <StatCard
            icon={<TrendingDown className="w-8 h-8" />}
            title="Average per Trip"
            value={`${stats?.avgEmissions || 0} kg`}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Activity className="w-8 h-8" />}
            title="This Month"
            value={`${stats?.monthlyEmissions || 0} kg`}
            color="bg-green-500"
          />
          <StatCard
            icon={<Award className="w-8 h-8" />}
            title="Badges Earned"
            value={badges.length.toString()}
            color="bg-yellow-500"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Emission Trends</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="emissions" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No data yet. Start calculating emissions!</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Breakdown</h2>
            {vehicleData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vehicleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">No data yet. Start calculating emissions!</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">AI Suggestions</h2>
            </div>
            <div className="space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      suggestion.priority === 'high'
                        ? 'border-red-500 bg-red-50'
                        : suggestion.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-green-500 bg-green-50'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No suggestions yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Your Badges</h2>
            </div>
            <div className="space-y-4">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start">
                      <Award className="w-8 h-8 text-yellow-600 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-800">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Start tracking to earn badges!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className={`${color} text-white p-3 rounded-lg inline-block mb-3`}>
      {icon}
    </div>
    <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);
