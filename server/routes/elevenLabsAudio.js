const express = require('express');
const router = express.Router();
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

// ElevenLabs API Key (Get free key from elevenlabs.io)
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY
});

// Generate audio for a scene using ElevenLabs
router.post('/generate-audio', async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({ error: 'Text and language are required' });
    }

    if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === '') {
      return res.status(500).json({ 
        error: 'ElevenLabs API key not configured',
        message: 'Please add ELEVENLABS_API_KEY to your .env file. Get free key from elevenlabs.io'
      });
    }

    console.log('Generating audio with ElevenLabs for language:', language);
    console.log('Text length:', text.length, 'characters');

    // Map language to ElevenLabs voice ID
    // Using Eleven Multilingual v2 model which supports 29+ languages
    const voiceMap = {
      // Indian Languages - All use multilingual voice for best results
      'hindi': 'pFZP5JQG7iQjIQuC4Bku',
      'marathi': 'pFZP5JQG7iQjIQuC4Bku',
      'odia': 'pFZP5JQG7iQjIQuC4Bku',
      'oriya': 'pFZP5JQG7iQjIQuC4Bku',
      'tamil': 'pFZP5JQG7iQjIQuC4Bku',
      'telugu': 'pFZP5JQG7iQjIQuC4Bku',
      'bengali': 'pFZP5JQG7iQjIQuC4Bku',
      'bangla': 'pFZP5JQG7iQjIQuC4Bku',
      'gujarati': 'pFZP5JQG7iQjIQuC4Bku',
      'kannada': 'pFZP5JQG7iQjIQuC4Bku',
      'malayalam': 'pFZP5JQG7iQjIQuC4Bku',
      'punjabi': 'pFZP5JQG7iQjIQuC4Bku',
      'urdu': 'pFZP5JQG7iQjIQuC4Bku',
      'assamese': 'pFZP5JQG7iQjIQuC4Bku',
      'kashmiri': 'pFZP5JQG7iQjIQuC4Bku',
      'konkani': 'pFZP5JQG7iQjIQuC4Bku',
      'manipuri': 'pFZP5JQG7iQjIQuC4Bku',
      'nepali': 'pFZP5JQG7iQjIQuC4Bku',
      'sanskrit': 'pFZP5JQG7iQjIQuC4Bku',
      'sindhi': 'pFZP5JQG7iQjIQuC4Bku',
      'bodo': 'pFZP5JQG7iQjIQuC4Bku',
      'dogri': 'pFZP5JQG7iQjIQuC4Bku',
      'maithili': 'pFZP5JQG7iQjIQuC4Bku',
      'santali': 'pFZP5JQG7iQjIQuC4Bku',
      // Major World Languages
      'english': 'pNInz6obpgDQGcFmaJgB', // Adam voice
      'spanish': 'pFZP5JQG7iQjIQuC4Bku',
      'french': 'pFZP5JQG7iQjIQuC4Bku',
      'german': 'pFZP5JQG7iQjIQuC4Bku',
      'italian': 'pFZP5JQG7iQjIQuC4Bku',
      'portuguese': 'pFZP5JQG7iQjIQuC4Bku',
      'arabic': 'pFZP5JQG7iQjIQuC4Bku',
      'chinese': 'pFZP5JQG7iQjIQuC4Bku',
      'mandarin': 'pFZP5JQG7iQjIQuC4Bku',
      'japanese': 'pFZP5JQG7iQjIQuC4Bku',
      'korean': 'pFZP5JQG7iQjIQuC4Bku',
      'russian': 'pFZP5JQG7iQjIQuC4Bku',
      'turkish': 'pFZP5JQG7iQjIQuC4Bku',
      'polish': 'pFZP5JQG7iQjIQuC4Bku',
      'dutch': 'pFZP5JQG7iQjIQuC4Bku',
      'swedish': 'pFZP5JQG7iQjIQuC4Bku',
      'ukrainian': 'pFZP5JQG7iQjIQuC4Bku',
      'czech': 'pFZP5JQG7iQjIQuC4Bku',
      'filipino': 'pFZP5JQG7iQjIQuC4Bku',
      'indonesian': 'pFZP5JQG7iQjIQuC4Bku',
      'malay': 'pFZP5JQG7iQjIQuC4Bku',
      'vietnamese': 'pFZP5JQG7iQjIQuC4Bku',
      'thai': 'pFZP5JQG7iQjIQuC4Bku'
    };

    const targetLang = language.toLowerCase();
    const voiceId = voiceMap[targetLang] || voiceMap['english'];

    // Generate audio using ElevenLabs
    const audio = await elevenlabs.textToSpeech.convert(voiceId, {
      text: text,
      model_id: 'eleven_multilingual_v2', // Best model for Hindi
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true
      }
    });

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Convert to base64 for easy transmission
    const base64Audio = audioBuffer.toString('base64');

    console.log('Audio generated successfully, size:', audioBuffer.length, 'bytes');

    res.json({
      success: true,
      audio: base64Audio,
      mimeType: 'audio/mpeg',
      size: audioBuffer.length
    });

  } catch (error) {
    console.error('ElevenLabs audio generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate audio',
      message: error.message,
      details: error.response?.data || error
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  const hasKey = ELEVENLABS_API_KEY && ELEVENLABS_API_KEY !== '';
  res.json({ 
    status: 'ok', 
    service: 'ElevenLabs Audio Generation',
    apiKeyConfigured: hasKey
  });
});

module.exports = router;
