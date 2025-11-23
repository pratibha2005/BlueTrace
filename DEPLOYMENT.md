# BlueTrace Deployment Guide

## 🚀 Deployment Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express + MongoDB)

---

## 📦 Backend Deployment on Render

### Step 1: Prepare Your Repository
1. Ensure your code is pushed to GitHub
2. Make sure `server/.env.example` is committed (but NOT `server/.env`)

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub

### Step 3: Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `bluetrace-api` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### Step 4: Add Environment Variables on Render
In the "Environment" section, add these variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_API_KEY=your_google_api_key
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
PEXELS_API_KEY=your_pexels_api_key
PORT=5000
NODE_ENV=production
```

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://bluetrace-api.onrender.com`)

---

## 🌐 Frontend Deployment on Vercel

### Step 1: Update API Configuration
1. Update `src/services/api.ts` with your Render backend URL:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bluetrace-api.onrender.com/api';
   ```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub

### Step 3: Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 4: Add Environment Variables on Vercel
In the "Environment Variables" section:
```
VITE_API_URL=https://bluetrace-api.onrender.com/api
```
(Replace with your actual Render backend URL)

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build (2-5 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

---

## ✅ Post-Deployment Checklist

### Backend (Render)
- [ ] Backend is accessible at `https://your-app.onrender.com/api/health`
- [ ] All environment variables are set correctly
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow all) or Render's IPs
- [ ] CORS is configured to allow your Vercel domain

### Frontend (Vercel)
- [ ] Frontend loads without errors
- [ ] API calls reach the backend successfully
- [ ] All features work (login, calculator, dashboard, etc.)
- [ ] Profile images upload and display correctly

---

## 🔧 MongoDB Atlas Configuration

If using MongoDB Atlas:
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Or add Render's specific IP addresses

---

## 🔄 Automatic Deployments

Both Render and Vercel support automatic deployments:
- **Render**: Auto-deploys on every push to `main` branch
- **Vercel**: Auto-deploys on every push to `main` branch

---

## 🐛 Troubleshooting

### Backend Issues
- **500 Error**: Check Render logs for errors
- **MongoDB Connection Failed**: Verify `MONGODB_URI` and IP whitelist
- **API Not Responding**: Ensure Render service is running (Free tier sleeps after inactivity)

### Frontend Issues
- **API Calls Failing**: Check `VITE_API_URL` is correct
- **CORS Errors**: Update backend CORS to allow your Vercel domain
- **404 on Refresh**: Ensure `vercel.json` rewrite rules are in place

### Environment Variables
- **Not Working**: Rebuild the project after adding/changing env vars
- **Undefined**: Ensure variable names match exactly (case-sensitive)

---

## 📱 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## 💰 Pricing Notes

### Free Tiers
- **Render Free**: 
  - Spins down after 15 min inactivity
  - 750 hours/month
  - First request after sleep takes ~30s
  
- **Vercel Free**:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions included

### Upgrade Recommendations
- **Render**: $7/month for always-on backend
- **Vercel**: $20/month for teams & more bandwidth

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT_SECRET** (32+ random characters)
3. **Enable MongoDB authentication**
4. **Use HTTPS only** (both platforms do this by default)
5. **Regularly rotate API keys**
6. **Monitor usage** to detect unusual activity

---

## 📞 Support

- **Render**: [docs.render.com](https://docs.render.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

Good luck with your deployment! 🌟
