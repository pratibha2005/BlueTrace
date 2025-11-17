const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Emission = require('../models/Emission');
const auth = require('../middleware/auth');

// Use Groq API for EcoBot intelligence
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Helper function to call Groq API
async function queryGroq(messages, temperature = 0.7) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      temperature: temperature,
      max_tokens: 1500
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// EcoBot Chat - AI conversation with context
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, language = 'English', conversationHistory = [] } = req.body;
    const userId = req.userId;

    // Get user's emission data for context
    const user = await User.findById(userId);
    const emissions = await Emission.find({ userId }).sort({ date: -1 }).limit(30);
    
    // Calculate user stats
    const totalEmissions = emissions.reduce((sum, e) => sum + (e.total || 0), 0);
    const avgDaily = emissions.length > 0 ? totalEmissions / emissions.length : 0;
    const recentTrend = emissions.length >= 7 
      ? emissions.slice(0, 7).reduce((sum, e) => sum + (e.total || 0), 0) / 7
      : avgDaily;

    // Build context-aware system prompt
    const systemPrompt = `You are EcoBot, a friendly and enthusiastic AI sustainability assistant for BlueTrace app. 

USER CONTEXT:
- Name: ${user.name || 'User'}
- Total emissions tracked: ${totalEmissions.toFixed(2)} kg CO₂
- Average daily emissions: ${avgDaily.toFixed(2)} kg CO₂
- Recent 7-day average: ${recentTrend.toFixed(2)} kg CO₂
- Trend: ${recentTrend < avgDaily ? 'IMPROVING! 🌱' : recentTrend > avgDaily ? 'needs attention' : 'stable'}

YOUR PERSONALITY:
- Warm, encouraging, and motivational
- Use emojis naturally (🌱🌍💚♻️⚡🚗)
- Speak in ${language} language (if not English, use native script + romanization if needed)
- Keep responses concise (2-4 sentences max)
- Celebrate improvements enthusiastically
- Gently motivate when emissions increase
- Give practical, actionable advice

YOUR CAPABILITIES:
- Explain carbon footprint in simple terms
- Give daily eco-tips
- Suggest behavior changes
- Answer environmental questions
- Integrate with BlueTrace calculator & suggestions
- Support multilingual conversations

EMOTION-BASED MESSAGING:
- If user improved: Congratulate warmly with celebration emojis
- If user needs help: Motivate gently with supportive language
- Always end with an actionable tip or encouragement`;

    // Build conversation messages
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // Last 3 exchanges for context
      { role: 'user', content: message }
    ];

    const response = await queryGroq(messages, 0.8); // Higher temperature for personality

    res.json({ 
      success: true, 
      response,
      userStats: {
        totalEmissions: totalEmissions.toFixed(2),
        avgDaily: avgDaily.toFixed(2),
        trend: recentTrend < avgDaily ? 'improving' : recentTrend > avgDaily ? 'increasing' : 'stable'
      }
    });

  } catch (error) {
    console.error('EcoBot chat error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get EcoBot response',
      fallback: '🌱 Hi! I\'m having trouble connecting right now, but I\'m here to help you reduce your carbon footprint! Try asking me about eco-tips or your emissions.'
    });
  }
});

// Get daily eco-tip
router.get('/daily-tip', auth, async (req, res) => {
  try {
    const { language = 'English' } = req.query;
    const userId = req.userId;
    
    const user = await User.findById(userId);
    const recentEmissions = await Emission.find({ userId }).sort({ date: -1 }).limit(7);
    
    // Analyze user's emission patterns
    const transportEmissions = recentEmissions.reduce((sum, e) => sum + (e.transport || 0), 0);
    const energyEmissions = recentEmissions.reduce((sum, e) => sum + (e.energy || 0), 0);
    const foodEmissions = recentEmissions.reduce((sum, e) => sum + (e.food || 0), 0);
    
    const highestCategory = Math.max(transportEmissions, energyEmissions, foodEmissions);
    let focusArea = 'general';
    if (highestCategory === transportEmissions) focusArea = 'transport';
    else if (highestCategory === energyEmissions) focusArea = 'energy';
    else if (highestCategory === foodEmissions) focusArea = 'food';

    const messages = [
      {
        role: 'system',
        content: `You are EcoBot. Generate ONE daily eco-tip in ${language} language for ${user.name || 'the user'}. 
        Focus area: ${focusArea} (their highest emission category).
        Make it: actionable, specific, encouraging, and brief (1-2 sentences).
        Use emojis naturally. Format: [Emoji] Tip text`
      },
      {
        role: 'user',
        content: `Give me today's eco-tip focused on reducing ${focusArea} emissions.`
      }
    ];

    const tip = await queryGroq(messages, 0.9);

    res.json({ 
      success: true, 
      tip,
      focusArea,
      generatedAt: new Date()
    });

  } catch (error) {
    console.error('Daily tip error:', error);
    res.status(500).json({ 
      success: false,
      tip: '🌱 Pro tip: Small changes today create a greener tomorrow! Start by tracking your daily emissions in BlueTrace.'
    });
  }
});

// Get personalized suggestions based on user patterns
router.get('/suggestions', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { language = 'English' } = req.query;
    
    const emissions = await Emission.find({ userId }).sort({ date: -1 }).limit(30);
    
    if (emissions.length === 0) {
      return res.json({
        success: true,
        suggestions: [
          "Start tracking your daily emissions to get personalized recommendations! 📊",
          "Use the calculator to understand your carbon footprint 🧮",
          "Watch educational videos in the Awareness section 🎥"
        ]
      });
    }

    // Calculate averages by category
    const stats = {
      transport: emissions.reduce((sum, e) => sum + (e.transport || 0), 0) / emissions.length,
      energy: emissions.reduce((sum, e) => sum + (e.energy || 0), 0) / emissions.length,
      food: emissions.reduce((sum, e) => sum + (e.food || 0), 0) / emissions.length,
      waste: emissions.reduce((sum, e) => sum + (e.waste || 0), 0) / emissions.length
    };

    const messages = [
      {
        role: 'system',
        content: `You are EcoBot. Generate 3 personalized behavior change suggestions in ${language} language based on user's emission patterns.
        
USER'S AVERAGE DAILY EMISSIONS:
- Transport: ${stats.transport.toFixed(2)} kg CO₂
- Energy: ${stats.energy.toFixed(2)} kg CO₂
- Food: ${stats.food.toFixed(2)} kg CO₂
- Waste: ${stats.waste.toFixed(2)} kg CO₂

REQUIREMENTS:
- Each suggestion should be specific and actionable
- Focus on the highest emission categories
- Include estimated CO₂ savings
- Use encouraging language
- Keep each suggestion to 1-2 sentences
- Start each with an emoji

Format: Return as JSON array of strings.`
      },
      {
        role: 'user',
        content: 'Give me 3 personalized suggestions to reduce my emissions.'
      }
    ];

    const response = await queryGroq(messages, 0.7);
    
    // Try to parse as JSON, fallback to splitting by newlines
    let suggestions;
    try {
      suggestions = JSON.parse(response);
    } catch {
      suggestions = response.split('\n').filter(s => s.trim().length > 0).slice(0, 3);
    }

    res.json({ 
      success: true, 
      suggestions,
      stats
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate suggestions'
    });
  }
});

// Generate motivational notification
router.get('/notification', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    // Get this week vs last week
    const now = new Date();
    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);
    
    const thisWeek = await Emission.find({ 
      userId, 
      date: { $gte: oneWeekAgo } 
    });
    const lastWeek = await Emission.find({ 
      userId, 
      date: { $gte: twoWeeksAgo, $lt: oneWeekAgo } 
    });
    
    const thisWeekTotal = thisWeek.reduce((sum, e) => sum + (e.total || 0), 0);
    const lastWeekTotal = lastWeek.reduce((sum, e) => sum + (e.total || 0), 0);
    
    const percentChange = lastWeekTotal > 0 
      ? ((thisWeekTotal - lastWeekTotal) / lastWeekTotal * 100).toFixed(1)
      : 0;
    
    const improved = thisWeekTotal < lastWeekTotal;
    
    const messages = [
      {
        role: 'system',
        content: `You are EcoBot. Generate a short motivational notification message.
        
User: ${user.name || 'User'}
This week's emissions: ${thisWeekTotal.toFixed(2)} kg CO₂
Last week's emissions: ${lastWeekTotal.toFixed(2)} kg CO₂
Change: ${percentChange}% (${improved ? 'IMPROVED ✅' : 'increased'})

Create a ${improved ? 'congratulatory' : 'motivational'} message (1 sentence).
${improved ? 'Celebrate their achievement! 🎉' : 'Gently encourage improvement 💪'}
Use emojis and their name.`
      },
      {
        role: 'user',
        content: 'Generate notification'
      }
    ];
    
    const notification = await queryGroq(messages, 0.9);
    
    res.json({
      success: true,
      notification,
      stats: {
        thisWeek: thisWeekTotal.toFixed(2),
        lastWeek: lastWeekTotal.toFixed(2),
        percentChange,
        improved
      }
    });
    
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ 
      success: false,
      notification: '🌱 Keep tracking your emissions! Every small step counts towards a greener planet.'
    });
  }
});

// Explain carbon footprint in simple language
router.post('/explain', auth, async (req, res) => {
  try {
    const { topic, language = 'English' } = req.body;
    
    const messages = [
      {
        role: 'system',
        content: `You are EcoBot, a friendly AI explaining environmental concepts in ${language} language.
        Explain in VERY simple terms (like explaining to a 12-year-old).
        Use analogies, examples from daily life, and emojis.
        Keep it short (3-4 sentences max).`
      },
      {
        role: 'user',
        content: `Explain: ${topic}`
      }
    ];
    
    const explanation = await queryGroq(messages, 0.7);
    
    res.json({
      success: true,
      explanation
    });
    
  } catch (error) {
    console.error('Explain error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to generate explanation'
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'EcoBot is online! 🤖🌱',
    groqConnected: !!GROQ_API_KEY
  });
});

module.exports = router;
