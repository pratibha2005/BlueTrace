import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Sparkles, 
  TrendingDown, 
  Leaf, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { suggestionsAPI } from '../../services/api';

interface Suggestion {
  title: string;
  description: string;
  priority: string;
  icon: string;
}

export const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await suggestionsAPI.getSuggestions();
      setSuggestions(data);
    } catch (err) {
      setError('Failed to fetch AI suggestions. Please try again.');
      console.error('Failed to fetch suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'from-red-500 to-orange-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          dotColor: 'bg-red-500',
          icon: AlertCircle,
          label: 'High Priority'
        };
      case 'medium':
        return {
          color: 'from-yellow-500 to-amber-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          dotColor: 'bg-yellow-500',
          icon: Info,
          label: 'Medium Priority'
        };
      default:
        return {
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          dotColor: 'bg-green-500',
          icon: CheckCircle,
          label: 'Low Priority'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="text-gray-700 text-lg font-semibold">Generating AI insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent">
                    AI Suggestions
                  </h1>
                  <p className="text-gray-600 text-lg mt-1">
                    Personalized tips to reduce your carbon footprint
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={fetchSuggestions}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Tips
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Stats Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-5xl font-bold mb-2">{suggestions.length}</h3>
              <p className="text-emerald-50 text-sm font-medium">Active Suggestions</p>
              <div className="mt-4 text-xs text-white/70">Generated by AI</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="relative bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-7 h-7" />
              </div>
              <h3 className="text-5xl font-bold mb-2">~24%</h3>
              <p className="text-cyan-50 text-sm font-medium">Potential Reduction</p>
              <div className="mt-4 text-xs text-white/70">Follow our tips</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-5xl font-bold mb-2">Eco+</h3>
              <p className="text-green-50 text-sm font-medium">Your Impact Level</p>
              <div className="mt-4 text-xs text-white/70">Keep it up!</div>
            </div>
          </motion.div>
        </div>

        {/* Suggestions Grid */}
        {suggestions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-gray-200/50"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No suggestions yet</h3>
            <p className="text-gray-600 mb-6">Complete more trips to get personalized AI recommendations</p>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Calculate Your First Trip
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {suggestions.map((suggestion, index) => {
              const config = getPriorityConfig(suggestion.priority);
              const IconComponent = config.icon;

              return (
                <motion.div
                  key={`suggestion-${suggestion.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
                  onClick={() => setSelectedSuggestion(suggestion)}
                  className="relative bg-white rounded-3xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2.5 h-2.5 ${config.dotColor} rounded-full animate-pulse`} />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {config.label}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all">
                          {suggestion.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                      {suggestion.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Leaf className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">Eco-Impact</div>
                          <div className="text-xs text-gray-500">High Priority</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                        <span>Apply</span>
                        <Zap className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedSuggestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedSuggestion(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getPriorityConfig(selectedSuggestion.priority).color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedSuggestion.title}
                    </h2>
                    <span className={`inline-block px-3 py-1 ${getPriorityConfig(selectedSuggestion.priority).bgColor} ${getPriorityConfig(selectedSuggestion.priority).borderColor} border rounded-full text-xs font-semibold`}>
                      {getPriorityConfig(selectedSuggestion.priority).label}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedSuggestion.description}
                </p>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    Environmental Impact
                  </h3>
                  <p className="text-gray-700">
                    Following this suggestion could reduce your carbon footprint by up to <span className="font-bold text-green-600">15-20%</span> on similar trips.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSuggestion(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all">
                    Apply Suggestion
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
