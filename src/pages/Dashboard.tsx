import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Award, Lightbulb, Activity, Calendar, Leaf, Car, Bike, Bus, Plane } from 'lucide-react';
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
// Dashboard functionality
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 font-medium">Loading your dashboard...</div>
          <div className="text-sm text-gray-500 mt-2">Gathering your carbon insights</div>
        </div>
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
        emissions,
        fill: getVehicleColor(vehicle)
      }))
    : [];

  const pieData = vehicleData.map(item => ({
    name: item.vehicle,
    value: item.emissions,
    fill: item.fill
  }));


  function getVehicleColor(vehicle: string) {
    const colorMap: Record<string, string> = {
      'car': '#3B82F6',
      'bike': '#10B981',
      'bus': '#F59E0B',
      'plane': '#EF4444',
      'train': '#8B5CF6',
      'motorcycle': '#06B6D4'
    };
    return colorMap[vehicle.toLowerCase()] || '#6B7280';
  }

  function getVehicleIcon(vehicle: string) {
    const iconMap: Record<string, React.ReactNode> = {
      'car': <Car className="w-5 h-5" />,
      'bike': <Bike className="w-5 h-5" />,
      'bus': <Bus className="w-5 h-5" />,
      'plane': <Plane className="w-5 h-5" />,
      'train': <Bus className="w-5 h-5" />,
      'motorcycle': <Bike className="w-5 h-5" />
    };
    return iconMap[vehicle.toLowerCase()] || <Car className="w-5 h-5" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Carbon Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Track your environmental impact</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Trips</div>
                <div className="text-2xl font-bold text-gray-900">{stats?.totalCalculations || 0}</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Activity className="w-8 h-8" />}
            title="Total Emissions"
            value={`${stats?.totalEmissions || 0} kg`}
            subtitle="CO₂ equivalent"
            color="from-red-500 to-pink-500"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            icon={<TrendingDown className="w-8 h-8" />}
            title="Average per Trip"
            value={`${stats?.avgEmissions || 0} kg`}
            subtitle="Per journey"
            color="from-blue-500 to-cyan-500"
            trend="-8%"
            trendUp={false}
          />
          <StatCard
            icon={<Calendar className="w-8 h-8" />}
            title="This Month"
            value={`${stats?.monthlyEmissions || 0} kg`}
            subtitle="Current month"
            color="from-green-500 to-emerald-500"
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            icon={<Award className="w-8 h-8" />}
            title="Badges Earned"
            value={badges.length.toString()}
            subtitle="Achievements"
            color="from-yellow-500 to-orange-500"
            trend="+2"
            trendUp={true}
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Emission Trends Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Emission Trends</h2>
                <p className="text-gray-600 text-sm">Your journey over time</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No data yet</p>
                <p className="text-gray-400 text-sm mt-1">Start calculating emissions to see trends!</p>
              </div>
            )}
          </div>

          {/* Vehicle Breakdown Chart */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Breakdown</h2>
                <p className="text-gray-600 text-sm">Emissions by transport type</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
            {vehicleData.length > 0 ? (
              <div className="flex items-center justify-between">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 pl-4">
                  <div className="space-y-3">
                    {vehicleData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <div className="flex items-center space-x-2">
                            {getVehicleIcon(item.vehicle)}
                            <span className="text-sm font-medium text-gray-700 capitalize">{item.vehicle}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.emissions}kg</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No vehicle data</p>
                <p className="text-gray-400 text-sm mt-1">Start tracking different transport types!</p>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions and Badges Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Suggestions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Suggestions</h2>
                <p className="text-gray-600 text-sm">Personalized recommendations</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`group p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md ${
                      suggestion.priority === 'high'
                        ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100'
                        : suggestion.priority === 'medium'
                        ? 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100'
                        : 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{suggestion.description}</p>
                      </div>
                      <div className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        suggestion.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : suggestion.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {suggestion.priority}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No suggestions yet</p>
                  <p className="text-gray-400 text-sm mt-1">Complete more trips to get personalized tips!</p>
                </div>
              )}
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Badges</h2>
                <p className="text-gray-600 text-sm">Achievements unlocked</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <div key={index} className="group p-4 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
                          {badge.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">{badge.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(badge.dateEarned).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-green-600 font-medium">
                            <Leaf className="w-3 h-3" />
                            <span>-{badge.emissionReduction}kg CO₂</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No badges yet</p>
                  <p className="text-gray-400 text-sm mt-1">Start tracking to earn your first achievement!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, color, trend, trendUp }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}) => (
  <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`bg-gradient-to-r ${color} text-white p-3 rounded-xl inline-block group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          trendUp ? 'text-green-600' : 'text-red-600'
        }`}>
          {trendUp ? (
            <TrendingDown className="w-4 h-4 rotate-180" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{trend}</span>
        </div>
      )}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      {subtitle && (
        <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
      )}
      <div className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
        {value}
      </div>
    </div>
  </div>
);
