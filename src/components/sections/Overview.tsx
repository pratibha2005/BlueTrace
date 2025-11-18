import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, Award, Lightbulb, Activity, Calendar, Leaf, Car, Bike, Bus, Plane, ArrowUpRight, Zap, Target, TrendingUp } from 'lucide-react';
import { calculatorAPI, suggestionsAPI, badgeAPI } from '../../services/api';
import { motion } from 'framer-motion';

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

const VEHICLE_CONFIG = {
  car: { icon: Car, color: '#3B82F6' },
  bike: { icon: Bike, color: '#10B981' },
  bus: { icon: Bus, color: '#F59E0B' },
  plane: { icon: Plane, color: '#EF4444' },
  train: { icon: Bus, color: '#8B5CF6' },
  motorcycle: { icon: Bike, color: '#06B6D4' },
  electric_car: { icon: Car, color: '#10B981' }
};

export const Overview = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [history, setHistory] = useState<Emission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChartTab, setActiveChartTab] = useState<'emissions' | 'trends' | 'goals'>('emissions');

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      calculatorAPI.getStats(),
      suggestionsAPI.getSuggestions(),
      badgeAPI.getBadges(),
      calculatorAPI.getHistory()
    ])
      .then(([statsData, suggestionsData, badgesData, historyData]) => {
        setStats(statsData);
        setSuggestions(suggestionsData);
        setBadges(badgesData);
        setHistory(historyData);
      })
      .catch(err => console.error('Failed to fetch dashboard data:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();

    // Listen for calculation events to refresh data
    const handleCalculation = () => {
      console.log('New calculation detected, refreshing data...');
      fetchData();
    };

    globalThis.addEventListener('calculationComplete', handleCalculation);
    
    return () => {
      globalThis.removeEventListener('calculationComplete', handleCalculation);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const chartData = history.slice(0, 10).reverse().map((e, i) => ({
    name: `${i + 1}`,
    emissions: e.co2Emissions
  }));

  const vehicleData = stats?.vehicleBreakdown
    ? Object.entries(stats.vehicleBreakdown).map(([vehicle, emissions]) => ({
        vehicle,
        emissions,
        fill: VEHICLE_CONFIG[vehicle.toLowerCase() as keyof typeof VEHICLE_CONFIG]?.color || '#6B7280'
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section - Performance + Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Card - Dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Carbon Stats</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-white text-3xl font-bold mb-1">{stats?.totalEmissions || 0}</div>
                <div className="text-white/60 text-sm">Total CO₂</div>
              </div>
              <div>
                <div className="text-white text-3xl font-bold mb-1">{stats?.avgEmissions || 0}</div>
                <div className="text-white/60 text-sm">Average</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Monthly emissions</div>
                  <div className="text-white/50 text-xs">{stats?.monthlyEmissions || 0} kg CO₂</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Total calculations</div>
                  <div className="text-white/50 text-xs">{stats?.totalCalculations || 0} trips</div>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Target goal</div>
                  <div className="text-white/50 text-xs">In progress</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Chart - Light Blue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-emerald-200 via-teal-200 to-green-300 rounded-3xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-6 mb-4">
              <button 
                onClick={() => setActiveChartTab('emissions')}
                className={`text-lg font-bold pb-2 transition-all ${
                  activeChartTab === 'emissions' 
                    ? 'text-slate-900 border-b-4 border-slate-900' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Emissions
              </button>
              <button 
                onClick={() => setActiveChartTab('trends')}
                className={`text-lg font-medium pb-2 transition-all ${
                  activeChartTab === 'trends' 
                    ? 'text-slate-900 border-b-4 border-slate-900' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Trends
              </button>
              <button 
                onClick={() => setActiveChartTab('goals')}
                className={`text-lg font-medium pb-2 transition-all ${
                  activeChartTab === 'goals' 
                    ? 'text-slate-900 border-b-4 border-slate-900' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Goals
              </button>
              <div className="ml-auto">
                <button className="px-4 py-2 bg-slate-900 text-white text-sm rounded-xl font-medium">
                  Week
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-lg">{stats?.totalEmissions || 0}</div>
                  <div className="text-slate-500 text-xs">Total CO₂</div>
                </div>
              </div>
              <div className="text-slate-600 text-sm">
                Your data updates<br />every <span className="font-bold">3 hours</span>
              </div>
            </div>

            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgba(255,255,255,0.8)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgba(255,255,255,0.1)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.3)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Area 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="white"
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorEmissions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Your Stats Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Your emissions breakdown</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Top Stats - Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Primary Card - Total Emissions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white overflow-hidden shadow-2xl col-span-1 md:col-span-2 cursor-pointer hover:shadow-3xl transition-shadow duration-300 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-emerald-100 font-medium">Total Carbon Footprint</span>
              </div>
              <div className="flex items-end gap-4 mb-6">
                <h2 className="text-6xl font-bold">{stats?.totalEmissions || '0'}</h2>
                <span className="text-3xl font-semibold text-emerald-100 mb-2">kg CO₂</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1 hover:bg-white/30 transition-colors">
                  <TrendingDown className="w-4 h-4" />
                  <span>12% less than last month</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Total Trips Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-2">Total Trips</p>
            <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{stats?.totalCalculations || 0}</h3>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+8 this week</span>
            </div>
          </motion.div>
        </div>

        {/* Large Gradient Cards - Vehicle Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {vehicleData.slice(0, 3).map((item, index) => {
            const IconComponent = VEHICLE_CONFIG[item.vehicle.toLowerCase() as keyof typeof VEHICLE_CONFIG]?.icon || Car;
            const percentage = ((item.emissions / Number.parseFloat(stats?.totalEmissions || '1')) * 100).toFixed(0);
            const gradients = [
              'from-emerald-400 via-teal-400 to-green-500',
              'from-teal-400 via-cyan-400 to-blue-400',
              'from-green-400 via-emerald-400 to-teal-500'
            ];
            
            return (
              <motion.div
                key={item.vehicle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className={`bg-gradient-to-br ${gradients[index]} rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow`}
              >
                <div className="relative z-10">
                  <h3 className="text-slate-900 font-bold text-xl mb-1 capitalize">{item.vehicle}</h3>
                  <p className="text-slate-700 text-sm mb-8">Transportation mode</p>

                  {/* Progress Circle */}
                  <div className="mb-8">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="white"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - Number(percentage) / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-slate-900 font-bold text-lg">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon Overlay */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30 group-hover:opacity-50 transition-opacity">
                  <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Bottom Stats */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-900 text-sm font-medium">
                    <span>{item.emissions.toFixed(1)} kg CO₂</span>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-slate-900" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={TrendingDown}
            label="Avg per Trip"
            value={stats?.avgEmissions || '0'}
            unit="kg"
            gradient="from-blue-500 to-cyan-500"
            trend="-5%"
            trendUp={false}
          />
          <StatCard
            icon={Calendar}
            label="This Month"
            value={stats?.monthlyEmissions || '0'}
            unit="kg"
            gradient="from-purple-500 to-pink-500"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            icon={Award}
            label="Badges Earned"
            value={badges.length.toString()}
            unit="total"
            gradient="from-amber-500 to-orange-500"
            trend="+2 new"
            trendUp={true}
          />
          <StatCard
            icon={Zap}
            label="Eco Score"
            value="87"
            unit="/100"
            gradient="from-green-500 to-emerald-500"
            trend="+3 pts"
            trendUp={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Emission Trends - Takes 2 columns */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Emission Trends</h3>
                <p className="text-gray-500 text-sm mt-1">Last 10 trips</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors duration-200 shadow-md">
                  Weekly
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                  Monthly
                </button>
              </div>
            </div>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      padding: '12px 16px'
                    }}
                    labelStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#areaGradient)"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState icon={Activity} message="No trips yet" subtext="Start tracking your journeys" />
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-gradient-to-br from-teal-700 via-emerald-700 to-green-600 rounded-3xl p-6 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <ActionButton icon={Car} label="Calculate Trip" gradient="from-emerald-400 to-teal-500" />
              <ActionButton icon={Award} label="View Badges" gradient="from-amber-400 to-orange-500" />
              <ActionButton icon={Lightbulb} label="Get Tips" gradient="from-yellow-400 to-amber-500" />
              <ActionButton icon={Target} label="Set Goals" gradient="from-blue-400 to-cyan-500" />
            </div>
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-200">
              <p className="text-sm text-emerald-100 mb-2 font-medium">Carbon Saved This Month</p>
              <p className="text-4xl font-bold mb-1">24.5 <span className="text-xl text-emerald-200">kg</span></p>
              <div className="mt-3 h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-full shadow-lg"></div>
              </div>
              <p className="text-xs text-emerald-200 mt-2">75% of monthly target</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vehicle Breakdown */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">By Transport</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            {vehicleData.length > 0 ? (
              <div className="space-y-4">
                {vehicleData.map((item) => {
                  const IconComponent = VEHICLE_CONFIG[item.vehicle.toLowerCase() as keyof typeof VEHICLE_CONFIG]?.icon || Car;
                  const percentage = ((item.emissions / Number.parseFloat(stats?.totalEmissions || '1')) * 100).toFixed(0);
                  return (
                    <div 
                      key={`vehicle-${item.vehicle}`}
                      className="space-y-2 group hover:bg-gray-50 p-2 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.fill}20` }}>
                            <IconComponent className="w-5 h-5" style={{ color: item.fill }} />
                          </div>
                          <span className="text-gray-700 font-medium capitalize group-hover:text-gray-900 transition-colors duration-200">{item.vehicle.replace('_', ' ')}</span>
                        </div>
                        <span className="text-gray-900 font-bold">{item.emissions}kg</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${percentage}%`, backgroundColor: item.fill }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon={Car} message="No data" subtext="Start tracking vehicles" />
            )}
          </motion.div>

          {/* AI Suggestions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">AI Tips</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-3">
              {suggestions.length > 0 ? (
                suggestions.slice(0, 3).map((s) => {
                  let priorityColor = 'bg-green-500';
                  if (s.priority === 'high') priorityColor = 'bg-red-500';
                  else if (s.priority === 'medium') priorityColor = 'bg-yellow-500';
                  return (
                    <div 
                      key={`suggestion-${s.title}-${s.priority}`}
                      className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${priorityColor}`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{s.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState icon={Lightbulb} message="No tips yet" subtext="Complete more trips" />
              )}
            </div>
          </motion.div>

          {/* Recent Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="space-y-3">
              {badges.length > 0 ? (
                badges.slice(0, 3).map((b, i) => (
                  <div 
                    key={`badge-${b.name}-${i}`}
                    className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{b.name}</h4>
                        <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <Leaf className="w-3 h-3 text-green-600" />
                          <span className="text-green-600 font-medium">-{b.emissionReduction}kg CO₂</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState icon={Award} message="No badges" subtext="Start earning achievements" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, unit, gradient, trend, trendUp }: any) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200/50 hover:shadow-2xl hover:border-gray-300 transition-all duration-200 group cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <span className="text-gray-500 text-sm">{unit}</span>
    </div>
  </div>
);

const ActionButton = ({ icon: Icon, label, gradient }: any) => (
  <button className={`w-full p-4 bg-gradient-to-r ${gradient} rounded-2xl text-white font-medium shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-between group`}>
    <span className="font-semibold">{label}</span>
    <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
  </button>
);

const EmptyState = ({ icon: Icon, message, subtext }: any) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
      <Icon className="w-7 h-7 text-gray-400" />
    </div>
    <p className="text-gray-500 font-medium text-sm">{message}</p>
    {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
  </div>
);