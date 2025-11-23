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
import { badgeAPI } from "../../services/api";
import { motion } from "framer-motion";

interface Badge {
  name: string;
  description: string;
  dateEarned: string;
  emissionReduction: number;
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

  useEffect(() => {
    badgeAPI
      .getBadges()
      .then((data) => setBadges(data))
      .catch((err) => console.error("Failed to fetch badges:", err))
      .finally(() => setLoading(false));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/40 p-4 sm:p-8">
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-10">
        {/* LEFT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-8 h-fit space-y-8"
        >
          {/* Eco Stats */}
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-8 shadow-xl border border-white/60">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-emerald-600" />
              Eco Score
            </h2>

            <div className="space-y-5">
              {/* Total Badges */}
              <div className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/80 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-500" />
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
              <div className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/80 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-emerald-600" />
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
              <div className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/80 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Eco Rank</p>
                    <p className="text-2xl font-bold text-gray-900">
                      Platinum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="backdrop-blur-2xl bg-white/80 rounded-3xl p-8 shadow-xl border border-white/60">
            <p className="text-xl font-semibold text-emerald-700 mb-2">
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
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              <Star className="inline w-8 h-8 mr-2 text-yellow-500" />
              Achievement Gallery
            </h1>
            <p className="text-gray-600 text-lg">
              A timeline of your positive impact.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-between backdrop-blur-xl bg-white/60 p-4 rounded-2xl border border-white/70 shadow">
            <h3 className="text-xl font-bold text-gray-900">
              All Badges ({badges.length})
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm shadow hover:bg-emerald-700">
                <CheckCircle className="inline w-4 h-4 mr-1" /> Earned
              </button>
              <button className="px-4 py-2 bg-white/40 backdrop-blur-sm text-gray-700 rounded-xl border border-gray-300/50 text-sm">
                Locked
              </button>
            </div>
          </div>

          {/* BADGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {badges.length ? (
              badges.map((badge, index) => {
                const style = badgeStyles[index % badgeStyles.length];
                const IconComponent = style.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 rounded-3xl shadow-xl border border-white/70 backdrop-blur-2xl 
                      bg-gradient-to-br ${style.gradient} ring-1 ${style.ring} group cursor-pointer`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-white/40 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition">
                        <IconComponent className="w-10 h-10 text-gray-700" />
                      </div>

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
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(badge.dateEarned).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full p-20 rounded-3xl text-center backdrop-blur-xl bg-white/60 border border-white/70 shadow-lg">
                <Award className="w-14 h-14 mx-auto text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700">
                  No badges earned yet
                </p>
                <p className="text-gray-500 mt-1">
                  Start your eco-journey to unlock achievements.
                </p>
              </div>
            )}
          </div>

          {/* RECENT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 backdrop-blur-2xl bg-white/70 rounded-3xl shadow-xl border border-white/60"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-500" />
              Latest Unlocks
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.slice(0, 3).map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Award className="w-7 h-7 text-emerald-600" />
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