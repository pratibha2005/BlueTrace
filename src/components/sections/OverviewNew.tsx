import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Activity, ChevronRight, ArrowRight } from 'lucide-react';
import { calculatorAPI } from '../../services/api';
import { motion } from 'framer-motion';

interface Stats {
  totalEmissions: string;
  avgEmissions: string;
  monthlyEmissions: string;
  totalCalculations: number;
}

interface Course {
  title: string;
  instructor: string;
  progress: number;
  lessons: number;
  totalLessons: number;
  tasks: number;
  totalTasks: number;
  color: string;
  image: string;
}

export const OverviewNew = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity');

  useEffect(() => {
    calculatorAPI.getStats()
      .then(() => {})
      .catch(err => console.error('Failed to fetch stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { day: 'Su', value: 8 },
    { day: 'Mo', value: 12 },
    { day: 'Tu', value: 15 },
    { day: 'We', value: 18 },
    { day: 'Th', value: 14 },
    { day: 'Fr', value: 11 },
    { day: 'Sa', value: 9 },
  ];

  const courses: Course[] = [
    {
      title: 'Carbon Footprint Basics',
      instructor: 'Environmental Team',
      progress: 26,
      lessons: 12,
      totalLessons: 45,
      tasks: 4,
      totalTasks: 15,
      color: 'from-pink-400 via-rose-400 to-orange-400',
      image: '/phone.png'
    },
    {
      title: 'Sustainable Living',
      instructor: 'Green Initiative',
      progress: 65,
      lessons: 24,
      totalLessons: 37,
      tasks: 8,
      totalTasks: 12,
      color: 'from-cyan-400 via-blue-400 to-purple-400',
      image: '/tablet.png'
    },
    {
      title: 'Eco-Friendly Transport',
      instructor: 'Mobility Solutions',
      progress: 100,
      lessons: 51,
      totalLessons: 51,
      tasks: 15,
      totalTasks: 15,
      color: 'from-purple-400 via-violet-400 to-indigo-400',
      image: '/laptop.png'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Performance Card - Dark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Performance</h3>
              <button className="text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-white text-4xl font-bold mb-1">76%</div>
                <div className="text-white/60 text-sm">Income</div>
              </div>
              <div>
                <div className="text-white text-4xl font-bold mb-1">44%</div>
                <div className="text-white/60 text-sm">Spendings</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Spending course</div>
                  <div className="text-white/50 text-xs">was taken</div>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Deposit program</div>
                  <div className="text-white/50 text-xs">was setup</div>
                </div>
              </div>

              <div className="flex items-center gap-3 group opacity-50">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Cashback program</div>
                  <div className="text-white/50 text-xs">activated</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Chart - Light Blue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-sky-200 to-cyan-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('activity')}
                className={`text-base sm:text-lg font-bold pb-2 transition-all whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'text-slate-900 border-b-4 border-slate-900'
                    : 'text-slate-600'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('clicks')}
                className={`text-base sm:text-lg font-medium pb-2 transition-all whitespace-nowrap ${
                  activeTab === 'clicks'
                    ? 'text-slate-900 border-b-4 border-slate-900'
                    : 'text-slate-600'
                }`}
              >
                Clicks
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`text-base sm:text-lg font-medium pb-2 transition-all whitespace-nowrap ${
                  activeTab === 'sales'
                    ? 'text-slate-900 border-b-4 border-slate-900'
                    : 'text-slate-600'
                }`}
              >
                Sales
              </button>
              <div className="ml-auto flex-shrink-0">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 text-white text-xs sm:text-sm rounded-xl font-medium">
                  Week
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4">
              <div className="bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-base sm:text-lg">12,560</div>
                  <div className="text-slate-500 text-xs">Your data</div>
                </div>
              </div>
              <div className="text-slate-600 text-xs sm:text-sm">
                Your data updates<br className="hidden sm:block" /><span className="sm:hidden"> </span>every <span className="font-bold">3 hours</span>
              </div>
            </div>

            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.3)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="white" 
                    strokeWidth={3}
                    dot={{ fill: '#0f172a', r: 6, strokeWidth: 3, stroke: 'white' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Your Courses Section */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your courses</h2>
            <div className="flex gap-1.5 sm:gap-2">
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 rotate-180" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`bg-gradient-to-br ${course.color} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow`}
            >
              <div className="relative z-10">
                <h3 className="text-slate-900 font-bold text-lg sm:text-xl mb-1">{course.title}</h3>
                <p className="text-slate-700 text-xs sm:text-sm mb-6 sm:mb-8">by {course.instructor}</p>

                {/* Progress Circle */}
                <div className="mb-6 sm:mb-8">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
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
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - course.progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-slate-900 font-bold text-lg">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Overlay */}
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-60 group-hover:opacity-80 transition-opacity">
                <div className="w-full h-full bg-gradient-to-tl from-white/40 to-transparent rounded-tl-[100px]" />
              </div>

              {/* Bottom Stats */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-slate-900 text-xs sm:text-sm font-medium">
                  <span>{course.lessons}/{course.totalLessons} lessons</span>
                  <span>{course.tasks}/{course.totalTasks} tasks</span>
                </div>
                <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/80 flex items-center justify-center hover:bg-white transition-colors flex-shrink-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
