# BlueTrace Backend Server

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
- MONGODB_URI: Your MongoDB connection string
- JWT_SECRET: Secret key for JWT tokens
- PORT: Server port (default: 5000)

3. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Carbon Calculator
- POST `/api/calculate` - Calculate emissions
- GET `/api/calculate/history` - Get emission history
- GET `/api/calculate/stats` - Get user statistics

### Suggestions
- GET `/api/suggestions` - Get AI-based suggestions

### Badges
- GET `/api/badge` - Get user badges
- POST `/api/badge/check` - Check and award new badges

### Awareness
- GET `/api/awareness?language=en` - Get awareness content
- GET `/api/awareness/all` - Get all content
