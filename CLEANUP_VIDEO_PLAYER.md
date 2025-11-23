# Video Player Redesign

## Current Issue
The video player is showing scene-by-scene slides with subtitles, not a continuous video.

## What User Wants
- ONE continuous video with real footage
- Full audio narration (not scene-by-scene)
- Smooth video transitions in background
- Professional documentary style

## Solution
Replace the playVideo function to:
1. Generate ONE audio file for entire script (ElevenLabs)
2. Play that audio continuously
3. Auto-cycle through video clips in background (every 8s)
4. Show subtle subtitles
5. NO scene counter

## Files to Update
- AwarenessVideos.tsx: Simplify playVideo() function
- Remove scene-by-scene audio generation
- Add continuous video background cycling
