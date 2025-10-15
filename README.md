# BlueTrace - Land Edition

A full-stack MERN web application that helps reduce land pollution by calculating and analyzing carbon emissions from land vehicles.

## Overview

BlueTrace (Land Edition) is a platform that estimates the carbon footprint of land vehicles based on fuel usage, distance, and type of vehicle. It uses AI to analyze user data, provide emission reduction suggestions, and reward eco-friendly driving habits through digital Green Badge Certificates.

## Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualization
- Lucide React for icons

### Backend
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT for authentication
- OpenAI API integration for AI suggestions

## Core Features

1. **Carbon Footprint Calculator**
   - Calculate CO₂ emissions based on vehicle type, fuel type, fuel consumption, and distance
   - Support for multiple vehicle types: cars, bikes, scooters, buses, trucks, electric vehicles
   - Support for fuel types: petrol, diesel, CNG, LPG, electric

2. **AI-Based Emission Reduction Suggestions**
   - Personalized tips based on user's emission data
   - Priority-based recommendations (high, medium, low)
   - Suggestions for eco-driving, vehicle switching, and route optimization

3. **Green Badge Certificate System**
   - Track user emission history
   - Award badges for milestones and improvements
   - Badges include: First Step, Eco Tracker, Electric Pioneer, Emission Reducer, Green Champion

4. **Multilingual Awareness Content**
   - Educational content in multiple languages (English, Spanish, Hindi, French)
   - Topics: Electric vehicles, public transport, eco-driving tips
   - AI-generated awareness scripts

5. **User Dashboard**
   - Emission trends visualization with charts
   - Vehicle breakdown analysis
   - Badge collection display
   - Personalized AI suggestions

## Project Structure

```
project/
├── src/                    # Frontend React application
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── context/          # React context (Auth)
│   ├── services/         # API service layer
│   └── App.tsx           # Main app component
│
└── server/               # Backend Node.js application
    ├── models/          # MongoDB schemas
    ├── routes/          # API routes
    ├── middleware/      # Express middleware
    ├── utils/           # Utility functions
    └── index.js         # Server entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `server/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

4. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Carbon Calculator
- `POST /api/calculate` - Calculate and save emissions
- `GET /api/calculate/history` - Get user's emission history
- `GET /api/calculate/stats` - Get user statistics

### Suggestions
- `GET /api/suggestions` - Get AI-based emission reduction suggestions

### Badges
- `GET /api/badge` - Get user's badges
- `POST /api/badge/check` - Check and award new badges

### Awareness
- `GET /api/awareness?language=en` - Get awareness content by language
- `GET /api/awareness/all` - Get all awareness content

## Usage

1. **Sign Up / Login**: Create an account or log in to access features

2. **Calculate Emissions**:
   - Go to Calculator page
   - Select vehicle type (car, bike, bus, etc.)
   - Choose fuel type (petrol, diesel, CNG, electric, etc.)
   - Enter fuel consumption and distance
   - Click Calculate to see CO₂ emissions

3. **View Dashboard**:
   - See total emissions and statistics
   - View emission trends over time
   - Check vehicle-wise breakdown
   - Read personalized AI suggestions
   - View earned badges

4. **Explore Awareness**:
   - Read educational content about sustainable transport
   - Switch between languages
   - Learn about electric vehicles, public transport, and eco-driving

## Emission Calculation

The app uses emission factors (kg CO₂ per liter/kWh) for different vehicle and fuel combinations:

- **Petrol**: 2.31 kg CO₂/liter (car), 0.089 kg CO₂/liter (bike)
- **Diesel**: 2.68 kg CO₂/liter
- **CNG**: 1.89 kg CO₂/kg
- **Electric**: 0.45 kg CO₂/kWh (considering grid electricity)

## Badge System

Users earn badges for:
- **First Step**: First emission calculation
- **Eco Tracker**: 10 journeys tracked
- **Electric Pioneer**: Using electric vehicles
- **Emission Reducer**: 20% reduction in emissions
- **Green Champion**: 50% reduction in emissions
- **Consistent Tracker**: 7 consecutive days of tracking

## Development

### Build for Production

Frontend:
```bash
npm run build
```

Backend:
```bash
cd server && npm start
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## Future Enhancements

- PDF generation for Green Badge Certificates
- Social sharing features
- Integration with real-time traffic data
- Route optimization suggestions
- Community leaderboards
- Mobile app version

## Contributing

This is a prototype application. For production use, consider:
- Adding proper error handling and validation
- Implementing rate limiting
- Adding comprehensive tests
- Securing API endpoints
- Optimizing database queries
- Adding logging and monitoring

## License

MIT License
