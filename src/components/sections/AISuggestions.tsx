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
    <div className="min-h-screen bg-transparent p-8">
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
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-yellow-700 bg-clip-text text-transparent">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <Target className="w-8 h-8 mb-3" />
            <h3 className="text-3xl font-bold mb-1">{suggestions.length}</h3>
            <p className="text-blue-100">Active Suggestions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <TrendingDown className="w-8 h-8 mb-3" />
            <h3 className="text-3xl font-bold mb-1">~24%</h3>
            <p className="text-green-100">Potential Reduction</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-200"
          >
            <Award className="w-8 h-8 mb-3" />
            <h3 className="text-3xl font-bold mb-1">Eco+</h3>
            <p className="text-purple-100">Your Impact Level</p>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedSuggestion(suggestion)}
                  className={`${config.bgColor} ${config.borderColor} border-2 rounded-3xl p-6 cursor-pointer hover:shadow-xl hover:border-opacity-100 transition-all duration-200 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 ${config.dotColor} rounded-full`} />
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          {config.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all">
                        {suggestion.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Eco-Impact: High</span>
                    </div>
                    <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More
                      <Zap className="w-4 h-4" />
                    </button>
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
