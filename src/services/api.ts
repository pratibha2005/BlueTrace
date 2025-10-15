const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return response.json();
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
    return response.json();
  },

  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/calculate/history`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/calculate/stats`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

export const suggestionsAPI = {
  getSuggestions: async () => {
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

export const badgeAPI = {
  getBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/badge`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  checkBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/badge/check`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

export const awarenessAPI = {
  getContent: async (language = 'en') => {
    const response = await fetch(`${API_BASE_URL}/awareness?language=${language}`);
    return response.json();
  },

  getAllContent: async () => {
    const response = await fetch(`${API_BASE_URL}/awareness/all`);
    return response.json();
  }
};
