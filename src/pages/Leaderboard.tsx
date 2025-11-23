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

  const filteredLeaderboard = leaderboard.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = filterRank === 'all' || user.rank.name === filterRank;
    return matchesSearch && matchesRank;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 p-3 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
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
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Trophy className="text-white" size={28} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                Leaderboard
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Top performers ranked by CO₂ savings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current User Card */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-md border border-green-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl sm:text-3xl">{currentUser.rank.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Your Rank: #{currentUser.position}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full inline-block w-fit">
                      {currentUser.rank.name}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">{currentUser.greenTrips} green trips completed</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{currentUser.totalSaved}</p>
                <p className="text-xs sm:text-sm text-gray-600">kg CO₂ Saved</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-md border border-gray-200"
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
                <div className={`min-h-[280px] sm:${heights[index]} bg-gradient-to-br ${getRankColor(user.rank.name)} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg relative overflow-hidden ${index === 0 ? 'ring-2 ring-yellow-400' : ''}`}>
                  <div className="relative z-10 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-center mb-2 sm:mb-3">
                        {badge.icon}
                      </div>
                      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{user.rank.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate px-2">{user.name}</h3>
                      <p className="text-xs sm:text-sm text-white/80 font-medium">{user.rank.name}</p>
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
                <thead className="bg-gray-50 border-b border-gray-200 hidden md:table-header-group">
                  <tr>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-center text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">Tier</th>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-center text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">CO₂ Saved</th>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-center text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">Green Trips</th>
                    <th className="px-3 lg:px-6 py-2 lg:py-3 text-center text-[10px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wider">Badges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeaderboard.map((user, index) => (
                    <motion.tr
                      key={user.userId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`hover:bg-gray-50 transition-colors md:table-row flex flex-col md:flex-row border-b md:border-b-0 ${
                        currentUser?.userId === user.userId 
                          ? 'bg-green-50 border-l-4 border-green-500' 
                          : ''
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
                        <div className="text-right md:text-left">
                          <p className="font-semibold text-gray-900 text-sm md:text-base">{user.name}</p>
                          <p className="text-xs md:text-sm text-gray-500 truncate max-w-[200px] md:max-w-none">{user.email}</p>
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
                        <div className="flex gap-1">
                          {user.badges.length > 0 ? (
                            user.badges.map((badge, i) => (
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
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-200">
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

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Total CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaderboard.reduce((sum, u) => sum + u.totalSaved, 0).toFixed(0)} kg
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Top Performer</p>
                <p className="text-lg font-bold text-gray-900 truncate max-w-[120px]">{leaderboard[0]?.name || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Avg Savings</p>
                <p className="text-2xl font-bold text-blue-600">
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
