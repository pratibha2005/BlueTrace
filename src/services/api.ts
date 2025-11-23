const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to handle API responses and errors
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
    
    // Throw error with message from backend
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  
  return data;
};

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await handleResponse(response);
    
    // Save token if signup successful
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse(response);
    
    // Save token if login successful
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const calculatorAPI = {
  calculate: async (data: {
    vehicleType: string;
    fuelType: string;
    fuelConsumption: number;
    distance: number;
  }) => {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/calculate/history`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/calculate/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export const suggestionsAPI = {
  getSuggestions: async () => {
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export const badgeAPI = {
  getBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/badge`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  checkBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/badge/check`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export const awarenessAPI = {
  getContent: async (language = 'en') => {
    const response = await fetch(`${API_BASE_URL}/awareness?language=${language}`);
    return handleResponse(response);
  },

  getAllContent: async () => {
    const response = await fetch(`${API_BASE_URL}/awareness/all`);
    return handleResponse(response);
  }
};

export const aiVideoAPI = {
  generateVideo: async (data: {
    topic: string;
    topicDescription: string;
    language: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/ai-video/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

export const elevenLabsAPI = {
  generateAudio: async (text: string, language: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/elevenlabs/generate-audio`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text, language })
      });
      
      const data = await response.json();
      
      // Check if server is telling us to use browser TTS (check this FIRST, before response.ok)
      if (data.useBrowserTTS) {
        console.log('✅ Using browser TTS (ElevenLabs unavailable)');
        return {
          success: false,
          useBrowserTTS: true,
          text: data.text || text,
          language: data.language || language
        };
      }
      
      if (!response.ok) {
        // If it's not ok and no useBrowserTTS flag, throw error
        console.log('⚠️ Audio API error, falling back to browser TTS');
        return {
          success: false,
          useBrowserTTS: true,
          text: text,
          language: language
        };
      }
      
      return data;
    } catch (error: any) {
      // Network error or JSON parse error - use browser TTS
      console.log('✅ Network error, using browser TTS');
      return {
        success: false,
        useBrowserTTS: true,
        text: text,
        language: language
      };
    }
  },
  
  checkHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/elevenlabs/health`);
    return handleResponse(response);
  }
};

export const ecobotAPI = {
  chat: async (message: string, language = 'English', conversationHistory: any[] = []) => {
    const response = await fetch(`${API_BASE_URL}/ecobot/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, language, conversationHistory })
    });
    return handleResponse(response);
  },

  getDailyTip: async (language = 'English') => {
    const response = await fetch(`${API_BASE_URL}/ecobot/daily-tip?language=${language}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getSuggestions: async (language = 'English') => {
    const response = await fetch(`${API_BASE_URL}/ecobot/suggestions?language=${language}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getNotification: async () => {
    const response = await fetch(`${API_BASE_URL}/ecobot/notification`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  explain: async (topic: string, language = 'English') => {
    const response = await fetch(`${API_BASE_URL}/ecobot/explain`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ topic, language })
    });
    return handleResponse(response);
  }
};

export const routeOptimizerAPI = {
  optimize: async (data: {
    origin: string;
    destination: string;
    vehicleType: string;
    fuelType: string;
    routes?: any[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/route-optimizer/optimize`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  saveScore: async (data: {
    routeChoice: string;
    emissionsSaved: number;
    date: Date;
  }) => {
    const response = await fetch(`${API_BASE_URL}/route-optimizer/save-score`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/route-optimizer/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};