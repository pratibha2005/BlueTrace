import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, MicOff, Sparkles, TrendingDown, TrendingUp, Lightbulb, X, Minimize2, Maximize2 } from 'lucide-react';
import { ecobotAPI } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function EcoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const [dailyTip, setDailyTip] = useState('');
  const [userStats, setUserStats] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load daily tip when opened
  useEffect(() => {
    if (isOpen && !dailyTip) {
      loadDailyTip();
    }
  }, [isOpen]);

  const loadDailyTip = async () => {
    try {
      const response = await ecobotAPI.getDailyTip(language);
      if (response.success) {
        setDailyTip(response.tip);
        setUserStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to load daily tip:', error);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await ecobotAPI.chat(inputMessage, language, conversationHistory);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (response.userStats) {
        setUserStats(response.userStats);
      }

    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: error.message || '🌱 Sorry, I had trouble processing that. Can you try again?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { emoji: '🌍', text: 'Explain my carbon footprint' },
    { emoji: '💡', text: 'Give me eco-tips' },
    { emoji: '🚗', text: 'How to reduce transport emissions?' },
    { emoji: '⚡', text: 'Energy saving tips' }
  ];

  const getTrendIcon = () => {
    if (!userStats) return null;
    if (userStats.trend === 'improving') return <TrendingDown className="text-green-500" size={16} />;
    if (userStats.trend === 'increasing') return <TrendingUp className="text-red-500" size={16} />;
    return null;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group z-50"
          >
            <Bot className="text-white group-hover:scale-110 transition-transform" size={32} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'bottom-6 right-6'} ${isMinimized ? 'w-80' : 'w-[420px]'} ${isMinimized ? 'h-16' : 'h-[600px]'} bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    EcoBot
                    <Sparkles size={16} className="animate-pulse" />
                  </h3>
                  <p className="text-white/80 text-xs">Your Smart Eco Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* User Stats Banner */}
                {userStats && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 border-b border-green-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Your Emissions:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-700">{userStats.avgDaily} kg CO₂/day</span>
                        {getTrendIcon()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Daily Tip */}
                {dailyTip && (
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 border-b border-amber-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                      <p className="text-sm text-gray-700">{dailyTip}</p>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="mx-auto text-gray-300 mb-4" size={48} />
                      <p className="text-gray-500 mb-4">Hi! I'm EcoBot 🌱<br/>Ask me anything about sustainability!</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {quickQuestions.map((q, index) => (
                          <button
                            key={index}
                            onClick={() => setInputMessage(q.text)}
                            className="p-2 bg-white rounded-lg hover:bg-green-50 border border-gray-200 hover:border-green-300 transition-colors text-sm text-left"
                          >
                            <span className="text-xl">{q.emoji}</span>
                            <p className="text-xs text-gray-600 mt-1">{q.text}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-3 ${
                        message.role === 'user' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Language Selector */}
                <div className="px-4 py-2 bg-white border-t border-gray-200">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="English">🇬🇧 English</option>
                    <option value="Hindi">🇮🇳 Hindi</option>
                    <option value="Tamil">🇮🇳 Tamil</option>
                    <option value="Bengali">🇮🇳 Bengali</option>
                    <option value="Marathi">🇮🇳 Marathi</option>
                    <option value="Telugu">🇮🇳 Telugu</option>
                    <option value="Punjabi">🇮🇳 Punjabi</option>
                  </select>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`p-2.5 rounded-lg transition-colors ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask EcoBot anything..."
                      className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      disabled={isLoading}
                    />
                    
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
