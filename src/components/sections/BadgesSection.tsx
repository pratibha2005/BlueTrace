import { useEffect, useState } from "react";
import {
  Award,
  Leaf,
  Trophy,
  Star,
  Zap,
  TrendingUp,
  Calendar,
  Target,
  CheckCircle,
} from "lucide-react";
import { badgeAPI, leaderboardAPI } from "../../services/api";
import { motion } from "framer-motion";

interface Badge {
  name: string;
  description: string;
  dateEarned: string;
  emissionReduction: number;
}

interface UserRank {
  name: string;
  icon: string;
  color: string;
}

// Apple-style glass + pastel gradients
const badgeStyles = [
  {
    icon: Trophy,
    gradient: "from-amber-200/70 via-yellow-100/60 to-white/40",
    ring: "ring-amber-300/40",
  },
  {
    icon: Star,
    gradient: "from-blue-200/70 via-cyan-100/60 to-white/40",
    ring: "ring-blue-300/40",
  },
  {
    icon: Zap,
    gradient: "from-rose-200/70 via-pink-100/60 to-white/40",
    ring: "ring-rose-300/40",
  },
  {
    icon: Target,
    gradient: "from-emerald-200/70 via-green-100/60 to-white/40",
    ring: "ring-green-300/40",
  },
  {
    icon: TrendingUp,
    gradient: "from-purple-200/70 via-fuchsia-100/60 to-white/40",
    ring: "ring-purple-300/40",
  },
  {
    icon: Award,
    gradient: "from-gray-200/70 via-gray-100/60 to-white/40",
    ring: "ring-gray-300/40",
  },
];

export const Badges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'earned' | 'locked'>('earned');
  const [userRank, setUserRank] = useState<UserRank>({ name: 'Beginner', icon: '🌱', color: 'green' });

  useEffect(() => {
    // Fetch badges
    badgeAPI
      .getBadges()
      .then((data) => setBadges(data))
      .catch((err) => console.error("Failed to fetch badges:", err))
      .finally(() => setLoading(false));

    // Fetch user rank from leaderboard
    leaderboardAPI
      .getLeaderboard()
      .then((response) => {
        if (response.success && response.currentUser) {
          setUserRank(response.currentUser.rank);
        }
      })
      .catch((err) => console.error("Failed to fetch user rank:", err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/40 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-lg font-semibold">
            Loading your Achievements…
          </p>
        </div>
      </div>
    );
  }

  const totalReduction = badges.reduce(
    (sum, b) => sum + b.emissionReduction,
    0
  );

  // Define all possible badges
  const allPossibleBadges = [
    { name: 'First Step', description: 'Complete your first carbon footprint calculation', emissionReduction: 5, requiredAction: 'First calculation', locked: true },
    { name: 'Eco Warrior', description: 'Reduce 50kg of CO₂ emissions', emissionReduction: 50, requiredAction: 'Save 50kg CO₂', locked: true },
    { name: 'Green Driver', description: 'Complete 5 green routes', emissionReduction: 25, requiredAction: '5 green trips', locked: true },
    { name: 'Century Saver', description: 'Save 100kg of CO₂ emissions', emissionReduction: 100, requiredAction: 'Save 100kg CO₂', locked: true },
    { name: 'Route Master', description: 'Complete 10 optimized routes', emissionReduction: 50, requiredAction: '10 green trips', locked: true },
    { name: 'Eco Champion', description: 'Reduce 200kg of CO₂ emissions', emissionReduction: 200, requiredAction: 'Save 200kg CO₂', locked: true },
    { name: 'Climate Hero', description: 'Save 500kg of CO₂ emissions', emissionReduction: 500, requiredAction: 'Save 500kg CO₂', locked: true },
    { name: 'Frequent Tracker', description: 'Log 20 emission records', emissionReduction: 30, requiredAction: '20 records', locked: true },
    { name: 'Green Commuter', description: 'Use eco-friendly transport 15 times', emissionReduction: 40, requiredAction: '15 eco trips', locked: true },
    { name: 'Sustainability Star', description: 'Maintain green habits for 30 days', emissionReduction: 75, requiredAction: '30 day streak', locked: true },
  ];

  // Mark earned badges as not locked
  const earnedBadgeNames = badges.map(b => b.name);
  const badgesWithStatus = allPossibleBadges.map(badge => ({
    ...badge,
    locked: !earnedBadgeNames.includes(badge.name),
    dateEarned: badges.find(b => b.name === badge.name)?.dateEarned || ''
  }));

  // Filter badges based on selected filter
  const displayedBadges = filter === 'earned' 
    ? badgesWithStatus.filter(b => !b.locked)
    : badgesWithStatus.filter(b => b.locked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-10">
        {/* LEFT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-8 h-fit space-y-8"
        >
          {/* Eco Stats */}
          <div className="backdrop-blur-2xl bg-white/90 rounded-3xl p-8 shadow-2xl border border-green-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              Eco Score
            </h2>

            <div className="space-y-5">
              {/* Total Badges */}
              <div className="flex items-center justify-between p-5 bg-white/60 rounded-2xl border border-green-100 shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Badges</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {badges.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* CO2 Reduced */}
              <div className="flex items-center justify-between p-5 bg-white/60 rounded-2xl border border-green-100 shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center shadow-lg">
                    <Leaf className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CO₂ Reduced</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalReduction.toFixed(1)}{" "}
                      <span className="text-lg text-emerald-600">kg</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Rank */}
              <div className="flex items-center justify-between p-5 bg-white/60 rounded-2xl border border-green-100 shadow-md hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-fuchsia-200 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">{userRank.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Eco Rank</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userRank.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="backdrop-blur-2xl bg-white/90 rounded-3xl p-8 shadow-2xl border border-green-100">
            <p className="text-xl font-black text-emerald-700 mb-2 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Next Milestone
            </p>
            <p className="text-sm text-gray-600 mb-5">
              You are close to unlocking the <b>Urban Sprout</b> badge.
            </p>

            <div className="h-3 bg-gray-200/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
              />
            </div>

            <div className="flex justify-between text-xs mt-2 text-gray-500">
              <span>3 steps left</span>
              <span className="font-semibold text-emerald-600">60% complete</span>
            </div>
          </div>


        </motion.div>

        {/* MAIN BADGE CONTENT */}
        <div className="space-y-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <motion.div
                animate={{ rotate: window.innerWidth >= 768 ? [0, 360] : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Star className="text-white" size={32} />
              </motion.div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Achievement Gallery
              </h1>
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              A timeline of your positive impact 🌱
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-between backdrop-blur-xl bg-white/90 p-6 rounded-3xl border border-green-100 shadow-xl">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-green-600" />
              {filter === 'earned' ? `Earned Badges (${badges.length})` : `Locked Badges (${badgesWithStatus.filter(b => b.locked).length})`}
            </h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setFilter('earned')}
                className={`px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all ${
                  filter === 'earned' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CheckCircle className="inline w-4 h-4 mr-1" /> Earned
              </button>
              <button 
                onClick={() => setFilter('locked')}
                className={`px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all ${
                  filter === 'locked' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
                }`}
              >
                🔒 Locked
              </button>
            </div>
          </div>

          {/* BADGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedBadges.length ? (
              displayedBadges.map((badge, index) => {
                const style = badgeStyles[index % badgeStyles.length];
                const IconComponent = style.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: badge.locked ? 1.02 : 1.08, y: badge.locked ? -2 : -8 }}
                    transition={{ duration: 0.3 }}
                    className={`p-7 rounded-3xl shadow-2xl border-2 backdrop-blur-2xl 
                      bg-gradient-to-br ${style.gradient} ring-2 ${style.ring} group cursor-pointer hover:shadow-3xl ${
                        badge.locked ? 'opacity-60 grayscale' : 'border-white/70'
                      }`}
                  >
                    <div className="flex flex-col items-center text-center relative">
                      {badge.locked && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-lg">🔒</span>
                        </div>
                      )}
                      <motion.div
                        whileHover={{ rotate: badge.locked ? 0 : 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 bg-white/50 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition"
                      >
                        <IconComponent className="w-12 h-12 text-gray-700" />
                      </motion.div>

                      <h4 className="font-bold text-gray-900 text-lg">
                        {badge.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {badge.description}
                      </p>

                      <div className="flex justify-between w-full mt-4 text-xs text-gray-500 border-t pt-3">
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <Leaf className="w-3 h-3" />-{badge.emissionReduction}kg
                        </span>
                        {badge.locked ? (
                          <span className="flex items-center gap-1 text-gray-600 font-medium">
                            🎯 {badge.requiredAction}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(badge.dateEarned).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full p-20 rounded-3xl text-center backdrop-blur-xl bg-white/60 border border-white/70 shadow-lg">
                <Award className="w-14 h-14 mx-auto text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700">
                  {filter === 'earned' ? 'No badges earned yet' : 'All badges unlocked!'}
                </p>
                <p className="text-gray-500 mt-1">
                  {filter === 'earned' 
                    ? 'Start your eco-journey to unlock achievements.' 
                    : 'Congratulations! You\'ve earned all available badges.'}
                </p>
              </div>
            )}
          </div>

          {/* RECENT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 backdrop-blur-2xl bg-white/90 rounded-3xl shadow-2xl border border-green-100"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-fuchsia-200 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              Latest Unlocks
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.slice(0, 3).map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border-2 border-green-100 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{b.name}</h4>
                      <p className="text-xs text-gray-500">
                        Earned on {new Date(b.dateEarned).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};