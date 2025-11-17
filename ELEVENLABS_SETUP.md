# Get Your FREE ElevenLabs API Key

Your AI video generator is now integrated with ElevenLabs for professional-quality text-to-speech in Hindi and 25+ languages!

## Steps to Get FREE API Key (10,000 characters/month):

1. **Go to ElevenLabs**: https://elevenlabs.io

2. **Sign Up** (completely free):
   - Click "Get Started Free"
   - Sign up with email or Google
   - No credit card required!

3. **Get Your API Key**:
   - After signup, go to: https://elevenlabs.io/app/settings/api-keys
   - Or: Click your profile → Settings → API Keys
   - Click "Copy" to copy your API key

4. **Add to Your Project**:
   - Open `server/.env` file
   - Find the line: `ELEVENLABS_API_KEY=`
   - Paste your key after the `=`
   - Example: `ELEVENLABS_API_KEY=sk_abc123xyz456`
   - Save the file

5. **Restart Server**:
   ```bash
   cd server
   npm start
   ```

6. **Test It**:
   - Generate a new video in Hindi
   - You'll hear PERFECT Hindi pronunciation!
   - The audio will sound like a real native speaker

## Free Tier Limits:
- ✅ 10,000 characters per month
- ✅ All voices available
- ✅ Multilingual v2 model (best for Hindi)
- ✅ No credit card needed
- ✅ Perfect for testing and small projects

## Voices Available:
- Hindi (native pronunciation)
- Marathi, Tamil, Telugu, Bengali
- English, Spanish, French, German, Italian
- Arabic, Chinese, Japanese, Korean
- Portuguese, Russian, Turkish, Polish
- And 25+ more languages!

## Note:
Each video generates ~8 scenes × ~100 characters = ~800 characters
So you can generate ~12 videos per month on the free tier.

For unlimited videos, upgrade to paid plan ($5/month for 30,000 characters).
