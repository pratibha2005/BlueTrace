# Google Maps API Setup Guide

## 🗺️ Getting Your Google Maps API Key

Follow these steps to enable dynamic route optimization with real-time traffic data:

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "BlueTrace Route Optimizer")
4. Click "Create"

### Step 2: Enable Required APIs

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for and enable the following APIs:
   - **Directions API** (Required for route calculation)
   - **Distance Matrix API** (Optional but recommended)
   - **Maps JavaScript API** (If you want to display maps in frontend)

### Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the generated API key
4. Click **"Restrict Key"** (IMPORTANT for security)

### Step 4: Restrict Your API Key (Security Best Practice)

#### Application Restrictions:
- For **development**: Choose "None" or "HTTP referrers" and add your domains
- For **production**: Choose "IP addresses" and add your server IPs

#### API Restrictions:
1. Select **"Restrict key"**
2. Check only the APIs you're using:
   - ✅ Directions API
   - ✅ Distance Matrix API
   
This prevents unauthorized usage of your API key.

### Step 5: Add API Key to Environment Variables

1. Open `server/.env` file
2. Replace the placeholder with your actual API key:

```env
GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

### Step 6: Restart Your Server

```bash
cd server
npm start
```

## 💰 Pricing Information

Google Maps API has a **FREE tier** with generous limits:

### Free Monthly Credits
- **$200 USD** in free monthly usage
- This equals approximately **40,000 Directions API requests/month**
- Traffic data is included at no extra cost

### Cost After Free Tier
- Directions API: **$5 per 1,000 requests**
- Most hobby projects stay within the free tier

### Setting Up Billing Alerts

1. Go to **Billing** → **Budgets & alerts** in Google Cloud Console
2. Create a budget alert at $50 to notify you if approaching limits
3. You can also set daily quotas in the API dashboard

## 🧪 Testing the Integration

Once you've added your API key:

1. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```

2. **Test the route optimizer**:
   - Open your app at http://localhost:5173
   - Navigate to "Route Optimizer"
   - Enter two locations (e.g., "New Delhi" and "Agra")
   - Click "Find Greenest Route"

3. **Check for real data**:
   - You should see 2-3 alternative routes
   - Each route should have real distances and durations
   - Traffic levels should reflect current conditions
   - The console should log: `✅ Fetched X routes from Google Maps API`

## 🔍 Troubleshooting

### Error: "Google Maps API key not found"
- Check that `GOOGLE_MAPS_API_KEY` is set in `server/.env`
- Restart your Node.js server after adding the key

### Error: "This API project is not authorized"
- Make sure you've enabled the **Directions API** in Google Cloud Console
- Check that your API key restrictions aren't blocking requests

### Using Fallback Data
- If the API key is not set or invalid, the system automatically falls back to sample data
- You'll see a warning: `⚠️ Using sample routes. Add GOOGLE_MAPS_API_KEY...`

### Rate Limiting
- If you exceed the free tier, requests will return errors
- Set up billing alerts to monitor usage
- Consider implementing caching for frequently requested routes

## 🌍 Supported Regions

Google Maps Directions API works globally, but coverage varies:
- **Excellent**: North America, Europe, India, Japan, Australia
- **Good**: Most major cities worldwide
- **Limited**: Remote areas, some developing regions

## 📚 Additional Resources

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Directions API Guide](https://developers.google.com/maps/documentation/directions/overview)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

## ✅ Verification Checklist

- [ ] Created Google Cloud Project
- [ ] Enabled Directions API
- [ ] Generated API Key
- [ ] Restricted API Key (security)
- [ ] Added key to `server/.env`
- [ ] Restarted server
- [ ] Tested with real locations
- [ ] Verified real-time data is being fetched
- [ ] Set up billing alerts (optional but recommended)

---

**Need Help?** Check the console logs in your terminal for detailed error messages.
