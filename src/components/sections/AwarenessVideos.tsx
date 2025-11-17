import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Globe, 
  Sparkles, 
  Leaf, 
  BookOpen, 
  TrendingUp,
  Languages,
  Loader,
  CheckCircle,
  ArrowRight,
  Wand2,
  AlertCircle
} from 'lucide-react';
import { aiVideoAPI } from '../../services/api';

interface VideoScene {
  id: number;
  text: string;
  icon: string;
  image: string;
  duration: number;
  animation: string;
  background: string;
  overlay: string;
}

interface AIVideo {
  id: string;
  topic: string;
  language: string;
  script: string;
  takeaways: string[];
  duration: number;
  scenes: VideoScene[];
  generatedAt: string;
  status: 'generating' | 'ready';
}

const VIDEO_TOPICS = [
  { 
    id: 'carbon-basics',
    title: 'Carbon Footprint Basics',
    description: 'Understanding what carbon footprint means and why it matters',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'vehicle-emissions',
    title: 'Vehicle Emissions Impact',
    description: 'How different vehicles contribute to carbon emissions',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'reduction-tips',
    title: 'Emission Reduction Tips',
    description: 'Practical ways to reduce your carbon footprint daily',
    icon: Leaf,
    color: 'from-teal-500 to-green-600'
  },
  { 
    id: 'public-transport',
    title: 'Public Transportation Benefits',
    description: 'Why choosing public transport helps the environment',
    icon: Video,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'electric-future',
    title: 'Electric Vehicles & Future',
    description: 'The role of EVs in sustainable transportation',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'community-action',
    title: 'Community Environmental Action',
    description: 'How communities can work together for cleaner air',
    icon: Globe,
    color: 'from-indigo-500 to-purple-500'
  },
];

export const AwarenessVideos = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [userLanguage, setUserLanguage] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState<AIVideo[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<AIVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const keepAliveRef = useRef<NodeJS.Timeout | null>(null);

  const generateVideo = async () => {
    if (!selectedTopic || !userLanguage.trim()) return;

    setIsGenerating(true);
    setError(null);
    
    const topic = VIDEO_TOPICS.find(t => t.id === selectedTopic);
    
    try {
      // Call the AI video generation API
      const response = await aiVideoAPI.generateVideo({
        topic: topic?.title || '',
        topicDescription: topic?.description || '',
        language: userLanguage
      });
      
      const newVideo: AIVideo = {
        id: Date.now().toString(),
        topic: response.video.topic,
        language: response.video.language,
        script: response.video.script,
        takeaways: response.video.takeaways,
        scenes: response.video.scenes || [],
        duration: response.video.duration,
        generatedAt: response.video.generatedAt,
        status: 'ready'
      };

      setGeneratedVideos([newVideo, ...generatedVideos]);
      setSelectedVideo(newVideo);
      setCurrentScene(0);
    } catch (err: any) {
      console.error('Failed to generate video:', err);
      setError(err.message || 'Failed to generate AI video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Play video with scenes and audio
  const playVideo = () => {
    if (!selectedVideo || !selectedVideo.scenes || selectedVideo.scenes.length === 0) return;
    
    // Clear any existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    
    setIsPlaying(true);
    setCurrentScene(0);
    setProgress(0);
    
    // Play audio using scenes (scene by scene for better control)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const startAudio = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        console.log('All available voices:', voices.map(v => `${v.name} (${v.lang})`));
        console.log('Target language:', selectedVideo.language);
        
        const targetLang = selectedVideo.language.toLowerCase();
        
        // Language code mapping
        const langCodes: Record<string, string[]> = {
          'hindi': ['hi-IN', 'hi'],
          'marathi': ['mr-IN', 'mr'],
          'odia': ['or-IN', 'or'],
          'tamil': ['ta-IN', 'ta'],
          'telugu': ['te-IN', 'te'],
          'bengali': ['bn-IN', 'bn'],
          'gujarati': ['gu-IN', 'gu'],
          'kannada': ['kn-IN', 'kn'],
          'malayalam': ['ml-IN', 'ml'],
          'punjabi': ['pa-IN', 'pa'],
          'english': ['en-IN', 'en-US', 'en-GB', 'en'],
          'spanish': ['es-ES', 'es'],
          'french': ['fr-FR', 'fr'],
          'german': ['de-DE', 'de'],
          'chinese': ['zh-CN', 'zh'],
          'arabic': ['ar-SA', 'ar'],
          'japanese': ['ja-JP', 'ja'],
          'korean': ['ko-KR', 'ko']
        };
        
        // Find matching voice
        let matchingVoice = null;
        
        // Try to find voice by language codes
        const codes = langCodes[targetLang] || [targetLang.substring(0, 2)];
        for (const code of codes) {
          matchingVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(code.toLowerCase()));
          if (matchingVoice) {
            console.log(`Found voice by code ${code}:`, matchingVoice.name, matchingVoice.lang);
            break;
          }
        }
        
        // Fallback: Try Google voices for better quality
        if (!matchingVoice) {
          for (const code of codes) {
            matchingVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.toLowerCase().includes(code));
            if (matchingVoice) {
              console.log('Found Google voice:', matchingVoice.name, matchingVoice.lang);
              break;
            }
          }
        }
        
        // Final fallback
        if (!matchingVoice) {
          matchingVoice = voices.find(v => v.lang.includes('en')) || voices[0];
          console.log('Using fallback voice:', matchingVoice?.name, matchingVoice?.lang);
        } else {
          console.log('Selected voice:', matchingVoice.name, matchingVoice.lang);
        }
        
        // Play each scene's text with the same voice
        let currentSceneIndex = 0;
        
        const playSceneAudio = () => {
          if (currentSceneIndex >= selectedVideo.scenes.length) {
            console.log('All scenes audio completed');
            return;
          }
          
          const scene = selectedVideo.scenes[currentSceneIndex];
          const textToSpeak = scene.text || `Scene ${currentSceneIndex + 1}`;
          
          console.log(`Scene ${currentSceneIndex + 1} text:`, textToSpeak.substring(0, 50) + '...');
          
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.rate = 0.85;
          utterance.pitch = 1;
          utterance.volume = 1;
          utterance.lang = matchingVoice?.lang || 'en-US';
          
          if (matchingVoice) {
            utterance.voice = matchingVoice;
          }
          
          utterance.onstart = () => {
            console.log(`Scene ${currentSceneIndex + 1} audio started - Speaking: ${textToSpeak.substring(0, 30)}...`);
          };
          
          utterance.onend = () => {
            console.log(`Scene ${currentSceneIndex + 1} audio ended`);
            currentSceneIndex++;
            
            if (currentSceneIndex < selectedVideo.scenes.length) {
              // Small delay between scenes, then play next
              setTimeout(() => {
                if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                  return; // Already playing
                }
                playSceneAudio();
              }, 500);
            }
          };
          
          utterance.onerror = (event) => {
            console.error(`Scene ${currentSceneIndex + 1} audio error:`, event);
            currentSceneIndex++;
            if (currentSceneIndex < selectedVideo.scenes.length) {
              setTimeout(playSceneAudio, 500);
            }
          };
          
          speechSynthRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        };
        
        // Start playing first scene audio
        playSceneAudio();
        
        // Keep speech synthesis alive (Chrome bug fix)
        keepAliveRef.current = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        }, 10000); // Resume every 10 seconds to prevent timeout
      };

      // Load voices and start
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        startAudio();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          startAudio();
        };
        setTimeout(startAudio, 100);
      }
    }
    
    // Progress tracking (100ms updates for smooth progress bar)
    const totalDuration = selectedVideo.duration * 1000;
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
      
      // Auto-stop when complete
      if (newProgress >= 100) {
        setIsPlaying(false);
        setCurrentScene(0);
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      }
    }, 100);
    
    // Auto-advance scenes (8 seconds each)
    let sceneIndex = 0;
    intervalRef.current = setInterval(() => {
      sceneIndex++;
      if (sceneIndex >= selectedVideo.scenes.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setCurrentScene(sceneIndex);
      }
    }, 8000);
  };

  const stopVideo = () => {
    setIsPlaying(false);
    setCurrentScene(0);
    setProgress(0);
    
    // Clear all intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    
    // Stop audio
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };



  // Get gradient class for scene background
  const getGradientClass = (background: string) => {
    const gradients: Record<string, string> = {
      'gradient-1': 'from-purple-600 via-pink-600 to-rose-600',
      'gradient-2': 'from-blue-600 via-cyan-600 to-teal-600',
      'gradient-3': 'from-green-600 via-emerald-600 to-teal-600',
      'gradient-4': 'from-orange-600 via-amber-600 to-yellow-600',
      'gradient-5': 'from-indigo-600 via-purple-600 to-pink-600'
    };
    return gradients[background] || gradients['gradient-1'];
  };

  // Get animation variant
  const getAnimationVariant = (animation: string) => {
    const variants: Record<string, any> = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      },
      slideUp: {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 }
      },
      zoomIn: {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.5, opacity: 0 }
      }
    };
    return variants[animation] || variants.fadeIn;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-700 bg-clip-text text-transparent">
                AI Video Generator
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Generate educational videos in any language with AI
              </p>
            </div>
          </div>

          {/* Video Generator Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left: Topic Selection */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Choose a Topic</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VIDEO_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        selectedTopic === topic.id
                          ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{topic.title}</h4>
                          <p className="text-sm text-gray-600">{topic.description}</p>
                        </div>
                        {selectedTopic === topic.id && (
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Language Input */}
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-6 shadow-xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6" />
                <h3 className="text-xl font-bold">Your Language</h3>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-white/90">
                  Enter your preferred language
                </label>
                <input
                  type="text"
                  value={userLanguage}
                  onChange={(e) => setUserLanguage(e.target.value)}
                  placeholder="e.g., Hindi, Marathi, Odia, Spanish, Arabic, etc."
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="text-sm text-white/90 mb-2">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  AI will generate a video in your language
                </p>
                <p className="text-xs text-white/70 mb-2">
                  Type any language name and our AI will create educational content explaining carbon emissions and sustainability in that language.
                </p>
                <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-2 mt-3">
                  <p className="text-xs text-green-100 font-medium">
                    ✨ FREE: Using Mixtral AI + Browser TTS (No costs!)
                  </p>
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={!selectedTopic || !userLanguage.trim() || isGenerating}
                className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate AI Video
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-100">{error}</p>
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs text-white/70">
                  {generatedVideos.length} videos generated
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generated Videos List */}
        {generatedVideos.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Your Generated Videos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedVideos.map((video, index) => {
                const topic = VIDEO_TOPICS.find(t => t.title === video.topic);
                const Icon = topic?.icon || Video;
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedVideo(video)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    {/* Video Header */}
                    <div className={`relative h-48 bg-gradient-to-br ${topic?.color || 'from-gray-500 to-gray-600'} p-6 flex flex-col justify-between`}>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <Languages className="w-4 h-4 text-white inline mr-1" />
                          <span className="text-white text-sm font-medium">{video.language}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg inline-flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-white" />
                          <span className="text-white text-xs font-medium">AI Generated</span>
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {video.topic}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {video.script?.substring(0, 100)}...
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {new Date(video.generatedAt).toLocaleDateString()}
                        </span>
                        <button className="flex items-center gap-1 text-purple-600 font-semibold hover:gap-2 transition-all">
                          Watch Now
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedVideos.length === 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Generated Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a topic and enter your language to generate AI-powered educational videos about carbon emissions
            </p>
          </motion.div>
        )}

        {/* Video Detail Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedVideo(null);
                stopVideo();
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">AI Generated Content</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{selectedVideo.topic}</h2>
                      <div className="flex items-center gap-3 text-white/90">
                        <span className="flex items-center gap-1">
                          <Languages className="w-4 h-4" />
                          {selectedVideo.language}
                        </span>
                        <span>•</span>
                        <span>{new Date(selectedVideo.generatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>
                </div>

                {/* Animated Video Player Section */}
                <div className="p-6">
                  {/* AI Video Player with Scene Animation */}
                  <div className="bg-black rounded-2xl overflow-hidden mb-6 shadow-2xl">
                    <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '400px' }}>
                      {/* Animated Scene Background */}
                      <AnimatePresence mode="wait">
                        {selectedVideo.scenes && selectedVideo.scenes.length > 0 && selectedVideo.scenes[currentScene] && (
                          <motion.div
                            key={currentScene}
                            {...getAnimationVariant(selectedVideo.scenes[currentScene].animation)}
                            transition={{ duration: 0.6 }}
                            className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(selectedVideo.scenes[currentScene].background)}`}
                          >
                            {/* Animated Particles/Waves Overlay */}
                            <div className="absolute inset-0 opacity-20">
                              {selectedVideo.scenes[currentScene].overlay === 'particles' ? (
                                <div className="absolute inset-0">
                                  {[...Array(20)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-2 h-2 bg-white rounded-full"
                                      style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`
                                      }}
                                      animate={{
                                        y: [0, -30, 0],
                                        opacity: [0.3, 0.8, 0.3],
                                        scale: [1, 1.5, 1]
                                      }}
                                      transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                      }}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className="absolute inset-0">
                                  {[...Array(5)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute h-px bg-white w-full"
                                      style={{
                                        top: `${20 + i * 20}%`
                                      }}
                                      animate={{
                                        x: ['-100%', '100%'],
                                        opacity: [0, 0.5, 0]
                                      }}
                                      transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: i * 0.5
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Real Image Background */}
                            <motion.div
                              initial={{ scale: 1.2, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8 }}
                              className="absolute inset-0"
                            >
                              <img
                                src={selectedVideo.scenes[currentScene].image}
                                alt={selectedVideo.scenes[currentScene].text}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to gradient if image fails to load
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              {/* Dark overlay for better text visibility */}
                              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                            </motion.div>

                            {/* Scene Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                              {/* Icon Badge Only - No Text */}
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", duration: 0.8 }}
                                className="bg-white/20 backdrop-blur-lg rounded-full p-8 border-4 border-white/30 shadow-2xl"
                              >
                                <span className="text-8xl">{selectedVideo.scenes[currentScene].icon}</span>
                              </motion.div>
                            </div>

                            {/* Scene Counter */}
                            <motion.div
                              initial={{ x: 100, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/20"
                            >
                              <span className="text-white text-sm font-bold flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Scene {currentScene + 1} / {selectedVideo.scenes.length}
                              </span>
                            </motion.div>

                            {/* Audio Indicator */}
                            {isPlaying && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/20"
                              >
                                <span className="text-white text-sm font-bold flex items-center gap-2">
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  >
                                    🔊
                                  </motion.div>
                                  Audio Playing
                                </span>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Professional Video Controls - MX Player Style */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20"
                        onClick={(e) => {
                          // Click on video to play/pause
                          if (e.target === e.currentTarget) {
                            isPlaying ? stopVideo() : playVideo();
                          }
                        }}
                      >
                        {/* Center Play Button (when not playing) */}
                        <AnimatePresence>
                          {!isPlaying && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={playVideo}
                                className="w-24 h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-lg transition-all"
                              >
                                <div className="w-0 h-0 border-l-[30px] border-l-purple-600 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent ml-2"></div>
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Bottom Control Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pb-6">
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="relative h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all group">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                              />
                              {/* Progress thumb */}
                              <motion.div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `${progress}%`, marginLeft: '-6px' }}
                              />
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Play/Pause Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={isPlaying ? stopVideo : playVideo}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
                              >
                                {!isPlaying ? (
                                  <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
                                ) : (
                                  <div className="flex gap-1">
                                    <div className="w-1 h-4 bg-white rounded"></div>
                                    <div className="w-1 h-4 bg-white rounded"></div>
                                  </div>
                                )}
                              </motion.button>

                              {/* Time Display */}
                              <div className="text-white text-sm font-medium">
                                <span>{Math.floor((progress / 100) * selectedVideo.duration)}s</span>
                                <span className="text-white/60"> / {selectedVideo.duration}s</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Scene Counter */}
                              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg">
                                <span className="text-white text-xs font-medium">
                                  Scene {currentScene + 1}/{selectedVideo.scenes.length}
                                </span>
                              </div>

                              {/* Audio Indicator */}
                              {isPlaying && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-green-500/30"
                                >
                                  <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                                    <motion.span
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 0.8, repeat: Infinity }}
                                    >
                                      🔊
                                    </motion.span>
                                    Audio
                                  </span>
                                </motion.div>
                              )}

                              {/* Language Badge */}
                              <div className="bg-purple-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-purple-500/30">
                                <span className="text-purple-300 text-xs font-medium flex items-center gap-1">
                                  <Languages className="w-3 h-3" />
                                  {selectedVideo.language}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Video Description */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">AI Generated Content</h3>
                        <p className="text-sm text-gray-600">Narrated in {selectedVideo.language} with subtitles</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 max-h-48 overflow-y-auto">
                      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                        {selectedVideo.script}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Takeaways:</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {selectedVideo.takeaways?.map((takeaway, idx) => (
                              <li key={idx}>• {takeaway}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Production Note */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="text-sm text-gray-700">
                        <strong>Browser Voice Support:</strong> Your browser's text-to-speech may have limited voice options. 
                        For best results with Hindi, Marathi, or other Indian languages:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li>Use Google Chrome (has Hindi voices on Windows 10/11)</li>
                          <li>Enable additional voices in Windows Settings → Time & Language → Speech</li>
                          <li>On Android/iOS, system voices are typically better for regional languages</li>
                        </ul>
                        <p className="mt-2 text-xs text-gray-600">
                          Check browser console for available voices. The AI script is generated in {selectedVideo.language}, 
                          but pronunciation depends on your system's installed voice packages.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                      <div className="text-sm text-gray-700">
                        <strong>AI Generated Content:</strong> This video uses Groq AI (FREE) to generate educational content in <strong>{selectedVideo.language}</strong> 
                        and browser text-to-speech for narration. The script is generated in your requested language, but voice quality 
                        depends on your device's available speech synthesis voices.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
