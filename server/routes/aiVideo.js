const express = require('express');
const router = express.Router();

// Use Groq API - FREE and FAST alternative
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Helper function to call Groq API (FREE - 14,400 requests/day)
async function queryGroq(prompt, systemPrompt = '') {
  const messages = systemPrompt 
    ? [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    : [{ role: 'user', content: prompt }];

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile', // Updated FREE model (Nov 2024)
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.statusText} - ${error}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Generate AI video content with script (FREE - using Groq or Fallback)
router.post('/generate', async (req, res) => {
  try {
    const { topic, topicDescription, language } = req.body;

    if (!topic || !language) {
      return res.status(400).json({ error: 'Topic and language are required' });
    }

    let script = '';
    let takeaways = [];

    // Try Groq API if key is available
    if (GROQ_API_KEY && GROQ_API_KEY !== '') {
      try {
        console.log('Generating script with Groq AI...');
        // Check if language needs romanization for TTS
        // All Indian languages + major world languages that use non-Latin scripts
        const needsRomanization = [
          // Indian Languages (22 Official + others)
          'hindi', 'marathi', 'odia', 'oriya', 'tamil', 'telugu', 'bengali', 'bangla',
          'gujarati', 'kannada', 'malayalam', 'punjabi', 'urdu', 'assamese', 'kashmiri',
          'konkani', 'manipuri', 'nepali', 'sanskrit', 'sindhi', 'bodo', 'dogri',
          'maithili', 'santali', 'tulu', 'khasi', 'garo', 'mizo', 'bhojpuri',
          // Major World Languages
          'arabic', 'chinese', 'mandarin', 'cantonese', 'japanese', 'korean', 
          'thai', 'persian', 'hebrew', 'greek', 'russian', 'ukrainian', 'armenian',
          'georgian', 'burmese', 'khmer', 'lao', 'tibetan', 'mongolian', 'amharic'
        ].some(lang => language.toLowerCase().includes(lang));

        const scriptPrompt = needsRomanization 
          ? `Create an engaging educational script about "${topic}" (${topicDescription}) in ${language} language.

The script should:
- Be 2 minutes long when spoken (approximately 300-350 words)
- Explain carbon emissions and sustainability concepts clearly
- Include practical examples and actionable tips
- Use simple, conversational language that engages the audience

IMPORTANT: Provide TWO versions:
1. Native script in ${language} (in native writing system)
2. Romanized version (using English/Latin alphabet for pronunciation)

Format:
NATIVE:
[script in native script]

ROMANIZED:
[script in Latin/English letters for pronunciation]

Example for Hindi:
NATIVE: नमस्ते, आज हम बात करेंगे
ROMANIZED: Namaste, aaj hum baat karenge`
          : `Create an engaging educational script about "${topic}" (${topicDescription}) in ${language} language.

The script should:
- Be 2 minutes long when spoken (approximately 300-350 words)
- Explain carbon emissions and sustainability concepts clearly
- Include practical examples and actionable tips
- Use simple, conversational language that engages the audience

Provide ONLY the script content, no additional commentary.`;

        const fullScript = await queryGroq(scriptPrompt, 'You are an expert environmental educator.');
        
        // Parse native and romanized versions if applicable
        if (needsRomanization && fullScript.includes('ROMANIZED:')) {
          const parts = fullScript.split('ROMANIZED:');
          script = parts[0].replace('NATIVE:', '').trim();
          const romanized = parts[1].trim();
          
          // Store romanized version in response (we'll use it for TTS fallback)
          res.locals.romanizedScript = romanized;
        } else {
          script = fullScript;
        }

        // Generate takeaways
        console.log('Generating takeaways...');
        const takeawaysPrompt = `Based on "${topic}", list exactly 4 key takeaways in ${language}. Format as simple bullet points.`;
        const takeawaysText = await queryGroq(takeawaysPrompt);

        takeaways = takeawaysText
          .split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^[\d\.\-\*]\s*/, '').trim())
          .filter(line => line.length > 10)
          .slice(0, 4);

      } catch (groqError) {
        console.log('Groq API failed, using fallback:', groqError.message);
        script = generateFallbackScript(topic, topicDescription, language);
      }
    } else {
      console.log('No Groq API key, using fallback content');
      script = generateFallbackScript(topic, topicDescription, language);
    }

    // Fallback takeaways if needed
    if (takeaways.length === 0) {
      takeaways = [
        'Understand the environmental impact of your transportation choices',
        'Learn practical steps to reduce carbon emissions',
        'Discover eco-friendly alternatives and solutions',
        'Get motivated to take action for a sustainable future'
      ];
    }

    // Generate video scenes for animation
    const videoScenes = generateVideoScenes(topic, script, language);

    // Return the generated content
    res.json({
      success: true,
      video: {
        script: script,
        romanizedScript: res.locals.romanizedScript || null,
        language: language,
        topic: topic,
        takeaways: takeaways,
        scenes: videoScenes, // For video animation
        duration: Math.ceil(script.split(' ').length / 2.5),
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('AI Video generation error:', error);
    
    // Return a fallback response
    const { topic, topicDescription, language } = req.body;
    const fallbackScript = generateFallbackScript(topic, topicDescription, language);
    const videoScenes = generateVideoScenes(topic, fallbackScript, language);
    
    res.json({
      success: true,
      video: {
        script: fallbackScript,
        language: language,
        topic: topic,
        takeaways: [
          'Understand the environmental impact of your transportation choices',
          'Learn practical steps to reduce carbon emissions',
          'Discover eco-friendly alternatives and solutions',
          'Get motivated to take action for a sustainable future'
        ],
        scenes: videoScenes,
        duration: 180,
        generatedAt: new Date().toISOString()
      }
    });
  }
});

// Fallback script generator
function generateFallbackScript(topic, description, language) {
  return `Educational Content: ${topic}

${description}

Carbon emissions from transportation are a major contributor to climate change. Understanding how our daily choices impact the environment is crucial for creating a sustainable future.

Key Points:

1. Vehicle Emissions: Different types of vehicles produce varying amounts of carbon emissions. Electric vehicles and public transportation significantly reduce individual carbon footprints.

2. Sustainable Alternatives: Walking, cycling, carpooling, and using public transport are effective ways to reduce emissions while saving money.

3. Eco-Driving Practices: Simple changes like maintaining proper tire pressure, avoiding aggressive acceleration, and reducing idling time can improve fuel efficiency by up to 30%.

4. Future Solutions: The shift toward renewable energy, electric vehicles, and improved public transportation infrastructure is essential for long-term sustainability.

Taking Action:

Every small change matters. By being mindful of our transportation choices and adopting sustainable practices, we can collectively make a significant positive impact on our environment.

Together, we can build a cleaner, greener future for generations to come.

[This content is AI-generated in ${language} language]`;
}

// Generate video scenes for animation with visuals
function generateVideoScenes(topic, script, language) {
  // Split script into sentences for scene-by-scene display
  const sentences = script.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Real images for different topics (Unsplash random images)
  const topicImages = {
    'carbon': [
      'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800'
    ],
    'vehicle': [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=800',
      'https://images.unsplash.com/photo-1552345387-5a7e01ed1c2e?w=800',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      'https://images.unsplash.com/photo-1550355191-aa8a80b41353?w=800',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
    ],
    'transport': [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=800',
      'https://images.unsplash.com/photo-1530569673472-307dc017a82d?w=800',
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800',
      'https://images.unsplash.com/photo-1445264718952-f4a5ec8e60f8?w=800',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
    ],
    'electric': [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
      'https://images.unsplash.com/photo-1609618663313-c7845a7787e1?w=800',
      'https://images.unsplash.com/photo-1552345387-5a7e01ed1c2e?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800'
    ],
    'emission': [
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800',
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
      'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800',
      'https://images.unsplash.com/photo-1421789497144-f50500b5fcf0?w=800',
      'https://images.unsplash.com/photo-1483354483454-4cd359948304?w=800',
      'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800'
    ],
    'community': [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      'https://images.unsplash.com/photo-1445264718952-f4a5ec8e60f8?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ]
  };

  // Icons for overlay
  const topicIcons = {
    'carbon': ['🌍', '🏭', '🚗', '♻️', '🌱', '💨', '🌳', '⚡'],
    'vehicle': ['🚗', '🚌', '🚲', '🚊', '⚡', '🔋', '🛣️', '🚦'],
    'transport': ['🚌', '🚇', '🚲', '🚶', '🌍', '💚', '🌱', '✨'],
    'electric': ['⚡', '🔋', '🚗', '🔌', '🌟', '💡', '🌿', '🌍'],
    'emission': ['💨', '🏭', '🌫️', '🌍', '📉', '🌱', '♻️', '🌳'],
    'community': ['👥', '🤝', '🌍', '💚', '🏘️', '🌳', '✨', '🌟']
  };

  // Determine which image and icon set to use
  let images = topicImages['carbon'];
  let icons = topicIcons['carbon'];
  const topicLower = topic.toLowerCase();
  
  for (const [key, imageSet] of Object.entries(topicImages)) {
    if (topicLower.includes(key)) {
      images = imageSet;
      icons = topicIcons[key];
      break;
    }
  }
  
  return sentences.slice(0, 6).map((sentence, index) => {
    let animation;
    if (index % 3 === 0) animation = 'fadeIn';
    else if (index % 3 === 1) animation = 'slideUp';
    else animation = 'zoomIn';
    
    return {
      id: index + 1,
      text: sentence.trim(),
      icon: icons[index % icons.length],
      image: images[index % images.length],
      duration: 8, // seconds per scene
      animation: animation,
      background: `gradient-${(index % 5) + 1}`,
      overlay: index % 2 === 0 ? 'particles' : 'waves'
    };
  });
}

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AI Video Generation' });
});

module.exports = router;
