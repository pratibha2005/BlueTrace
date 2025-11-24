import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Users, Award, Zap, Leaf, ArrowLeft, Search, Filter } from 'lucide-react';
import { leaderboardAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface LeaderboardUser {
  userId: string;
  name: string;
  email: string;
  position: number;
  totalEmissions: number;
  totalSaved: number;
  greenTrips: number;
  rank: {
    name: string;
    color: string;
    icon: string;
  };
  badges: Array<{ name: string; icon: string }>;
  joinedDate: string;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState('all');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await leaderboardAPI.getLeaderboard();
      if (response.success) {
        setLeaderboard(response.leaderboard);
        setCurrentUser(response.currentUser);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankColor = (rankName: string) => {
    switch (rankName) {
      case 'Platinum': return 'from-gray-300 to-gray-400';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-500';
      case 'Bronze': return 'from-orange-700 to-orange-900';
      default: return 'from-green-400 to-green-600';
    }
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return { icon: <Crown className="text-yellow-400" size={32} />, glow: 'shadow-yellow-400' };
    if (position === 2) return { icon: <Medal className="text-gray-400" size={28} />, glow: 'shadow-gray-400' };
    if (position === 3) return { icon: <Medal className="text-orange-700" size={28} />, glow: 'shadow-orange-700' };
    return { icon: <Trophy className="text-gray-500" size={24} />, glow: '' };
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-green-400 to-green-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredLeaderboard = leaderboard.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === 'all' || user.rank.name === filterRank;
    return matchesSearch && matchesRank;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-3 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-300/40 to-emerald-400/40 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-300/40 to-teal-400/40 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-300/30 to-green-400/30 rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 font-medium transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 ring-4 ring-yellow-200/50"
            >
              <Trophy className="text-white" size={32} />
            </motion.div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Leaderboard
              </h1>
              <p className="text-gray-700 text-sm sm:text-base font-semibold">
                🏆 Top eco-warriors ranked by CO₂ savings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current User Card */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="backdrop-blur-xl bg-gradient-to-r from-white/90 via-green-50/80 to-emerald-50/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 mb-4 sm:mb-6 shadow-2xl border-2 border-white/60 ring-2 ring-green-200/50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                {/* Profile Picture */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getAvatarColor(currentUser.name)} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl ring-4 ring-white/50 font-bold text-white text-xl sm:text-2xl`}>
                  {getInitials(currentUser.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 truncate">#{currentUser.position} You</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentUser.rank.icon}</span>
                      <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg">
                        {currentUser.rank.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2 font-medium">🌿 {currentUser.greenTrips} green trips completed</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{currentUser.totalSaved}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">kg CO₂ Saved</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-xl border border-white/60"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-xs sm:text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={filterRank}
                onChange={(e) => setFilterRank(e.target.value)}
                className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <option value="all">All Ranks</option>
                <option value="Platinum">💎 Platinum</option>
                <option value="Gold">🏆 Gold</option>
                <option value="Silver">🥈 Silver</option>
                <option value="Bronze">🥉 Bronze</option>
                <option value="Beginner">🌱 Beginner</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          {filteredLeaderboard.slice(0, 3).map((user, index) => {
            const badge = getPositionBadge(user.position);
            const heights = ['h-80', 'h-88', 'h-80'];
            const orders = [2, 1, 3]; // Center the #1
            
            return (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`order-${orders[index]} relative`}
              >
                <div className={`min-h-[280px] sm:${heights[index]} bg-gradient-to-br ${getRankColor(user.rank.name)} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden ${index === 0 ? 'ring-4 ring-yellow-400/70 scale-105' : 'ring-2 ring-white/30'}`}>
                  <div className="relative z-10 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-center mb-2 sm:mb-3">
                        {badge.icon}
                      </div>
                      {/* Profile Picture */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${getAvatarColor(user.name)} rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/80 font-bold text-white text-xl sm:text-2xl`}>
                          {getInitials(user.name)}
                        </div>
                      </div>
                      <div className="text-3xl sm:text-4xl mb-2">{user.rank.icon}</div>
                      <h3 className="text-lg sm:text-xl font-black text-white mb-1 truncate px-2 drop-shadow-lg">{user.name}</h3>
                      <p className="text-xs sm:text-sm text-white/90 font-bold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block">{user.rank.name}</p>
                    </div>
                    
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/30">
                      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{user.totalSaved}</p>
                      <p className="text-[10px] sm:text-xs text-white/90">kg CO₂ Saved</p>
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/30">
                        <div className="flex justify-center gap-1 mb-1">
                          {user.badges.slice(0, 3).map((badge, i) => (
                            <span key={i} className="text-base sm:text-lg">{badge.icon}</span>
                          ))}
                        </div>
                        <p className="text-white/80 text-[10px] sm:text-xs">{user.greenTrips} green trips</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden border border-gray-200"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                <Users size={20} className="sm:w-6 sm:h-6" />
                All Rankings
              </h2>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                <Award size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="font-semibold text-xs sm:text-sm">{filteredLeaderboard.length} Users</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-green-50/50 border-b-2 border-green-200 hidden md:table-header-group">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">Position</th>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-center text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">Tier</th>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-center text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">CO₂ Saved</th>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-center text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">Green Trips</th>
                    <th className="px-3 lg:px-6 py-3 lg:py-4 text-center text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider">Badges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeaderboard.map((user, index) => (
                    <motion.tr
                      key={user.userId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-green-50/50 transition-all duration-200 md:table-row flex flex-col md:flex-row border-b md:border-b-0 ${
                        currentUser?.userId === user.userId 
                          ? 'bg-green-50 border-l-4 border-green-500 shadow-sm' 
                          : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-3 lg:px-6 py-3 md:py-4 md:table-cell flex items-center justify-between md:justify-start">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">Rank</span>
                        <div className="flex items-center gap-2">
                          {user.position <= 3 ? (
                            getPositionBadge(user.position).icon
                          ) : (
                            <span className="text-base md:text-lg font-bold text-gray-400">#{user.position}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-2 md:py-4 md:table-cell flex items-center justify-between md:justify-start">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">User</span>
                        <div className="flex items-center gap-3 text-right md:text-left">
                          {/* Profile Picture */}
                          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${getAvatarColor(user.name)} rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white font-bold text-white text-sm md:text-base flex-shrink-0`}>
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm md:text-base truncate">{user.name}</p>
                            <p className="text-xs md:text-sm text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-2 md:py-4 md:table-cell flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">Tier</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl">{user.rank.icon}</span>
                          <span className="font-semibold text-gray-700 text-xs md:text-sm">
                            {user.rank.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-2 md:py-4 md:text-center md:table-cell flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">CO₂ Saved</span>
                        <div className="flex items-center gap-2">
                          <Leaf className="text-green-600" size={16} />
                          <span className="font-bold text-green-600 text-sm md:text-base">{user.totalSaved} kg</span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-2 md:py-4 md:text-center md:table-cell flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">Green Trips</span>
                        <div className="flex items-center gap-2">
                          <Zap className="text-blue-600" size={14} />
                          <span className="font-semibold text-gray-700 text-sm md:text-base">{user.greenTrips}</span>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-2 md:py-4 md:table-cell flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-xs font-semibold text-gray-600 uppercase">Badges</span>
                        <div className="flex flex-col items-end md:items-center gap-1.5">
                          <div className="flex gap-1">
                            {user.badges.length > 0 ? (
                              user.badges.slice(0, 4).map((badge, i) => (
                                <span
                                  key={i}
                                  className="text-base md:text-lg"
                                  title={badge.name}
                                >
                                  {badge.icon}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs">No badges</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] md:text-xs text-gray-500 font-medium">
                              {user.badges.length} badge{user.badges.length !== 1 ? 's' : ''}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-[10px] md:text-xs font-semibold text-gray-700">
                              {user.rank.name}
                            </span>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="text-white" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium truncate">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{leaderboard.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Leaf className="text-white" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium truncate">Total CO₂ Saved</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {leaderboard.reduce((sum, u) => sum + u.totalSaved, 0).toFixed(0)} kg
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy className="text-white" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium truncate">Top Performer</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900 truncate">{leaderboard[0]?.name || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium truncate">Avg Savings</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {(leaderboard.reduce((sum, u) => sum + u.totalSaved, 0) / leaderboard.length || 0).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
