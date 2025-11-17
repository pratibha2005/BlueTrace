# AI Video Generation Setup (FREE VERSION)

## Overview
The AI Video Generator creates educational videos with narrated audio in any language the user selects (including regional languages like Marathi, Odia, Tamil, Telugu, etc.)

**🎉 100% FREE - No API costs!**

## Features
- ✅ AI-generated educational scripts using **FREE Mixtral-8x7B** model
- ✅ Text-to-speech audio narration using **FREE Bark TTS**
- ✅ Browser text-to-speech fallback (always works)
- ✅ Auto-generated key takeaways
- ✅ Real-time audio playback in the browser
- ✅ Support for all languages (English, Hindi, Marathi, Odia, Spanish, Arabic, etc.)
- ✅ **No credit card required, no API costs**

## Setup Instructions

### 1. No API Key Required! (Optional Enhancement)

The system works **without any API key** using Hugging Face's public inference API.

**Optional**: For better performance, get a free Hugging Face API token:

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Create a new token
5. Copy the token (starts with `hf_...`)

### 2. Add API Key to Environment (Optional)

Open `server/.env` file and add:

```env
HUGGINGFACE_API_KEY=hf_your_token_here
```

**Note**: The system works fine without this - it's just for faster processing!

### 3. Install Dependencies (if not already done)

```bash
cd server
npm install
```

The required package `openai@^6.7.0` is already in package.json.

### 4. Start the Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

### 5. Start the Frontend

In a new terminal:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## How It Works

### Backend Flow (`/api/ai-video/generate`)

1. **User Input**: 
   - Topic (e.g., "Carbon Footprint Basics")
   - Language (e.g., "Marathi", "Hindi", "Arabic")

2. **AI Script Generation** (FREE):
   - Uses **Mixtral-8x7B-Instruct** (free Hugging Face model)
   - Creates educational script in selected language
   - Script is 2-3 minutes long
   - Culturally appropriate for the language

3. **Audio Generation** (FREE):
   - Uses **Bark TTS** (free Hugging Face model)
   - Generates WAV audio narration
   - Returns base64-encoded audio
   - Fallback: Browser's built-in text-to-speech

4. **Key Takeaways** (FREE):
   - AI generates 4 key learning points using Mixtral
   - Formatted as bullet list

### Frontend Flow

1. User selects topic from 6 categories
2. User enters any language name
3. Clicks "Generate AI Video"
4. Backend processes (takes 10-30 seconds)
5. Video card appears in "Your Generated Videos"
6. Click "Watch Now" to open modal
7. Audio player streams the narrated content

## API Response Structure

```json
{
  "success": true,
  "video": {
    "script": "Full educational script in user's language...",
    "audio": "base64_encoded_audio_data",
    "audioFormat": "mp3",
    "language": "Marathi",
    "topic": "Carbon Footprint Basics",
    "takeaways": [
      "Understanding transportation impact...",
      "Practical reduction steps...",
      "Eco-friendly alternatives...",
      "Sustainable future actions..."
    ],
    "duration": 180,
    "generatedAt": "2025-11-17T10:30:00.000Z"
  }
}
```

## Cost Estimation

**COMPLETELY FREE! 🎉**

- **Mixtral-8x7B**: FREE via Hugging Face Inference API
- **Bark TTS**: FREE via Hugging Face Inference API
- **Browser TTS**: FREE (built into your browser)

Estimated cost per video: **$0.00**

No credit card, no billing, no limits on the free tier!

## Supported Languages

The system supports **ANY language**, including:

### Indian Languages
- Hindi (हिंदी)
- Marathi (मराठी)
- Odia (ଓଡ଼ିଆ)
- Bengali (বাংলা)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)

### International Languages
- Spanish, French, German, Portuguese
- Arabic, Chinese, Japanese, Korean
- And literally any other language!

## Troubleshooting

### Error: "Invalid API Key"
- Check that OPENAI_API_KEY in .env is correct
- Make sure there are no extra spaces
- Restart the server after changing .env

### Error: "Rate limit exceeded"
- You've hit OpenAI's rate limit
- Wait a few minutes or upgrade your OpenAI plan

### Error: "Insufficient quota"
- Add billing information to your OpenAI account
- Purchase credits at https://platform.openai.com/billing

### Audio not playing
- Check browser console for errors
- Try a different browser (Chrome/Edge recommended)
- Ensure audio permissions are enabled

## Future Enhancements

- [ ] Add visual animations synchronized with audio
- [ ] Support for multiple voice options
- [ ] Video download functionality
- [ ] Subtitle generation in selected language
- [ ] Video quality/speed controls
- [ ] Save videos to user's account
- [ ] Share generated videos

## Technical Stack

- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4 + TTS-1
- **Frontend**: React + TypeScript + Framer Motion
- **Audio**: HTML5 Audio API
- **Storage**: MongoDB (for video metadata)
