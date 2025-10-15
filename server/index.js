const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const calculateRoutes = require('./routes/calculate');
const suggestionsRoutes = require('./routes/suggestions');
const badgeRoutes = require('./routes/badge');
const awarenessRoutes = require('./routes/awareness');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/calculate', calculateRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/badge', badgeRoutes);
app.use('/api/awareness', awarenessRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BlueTrace API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
