const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const vitalLogsRoutes = require('./routes/vitalLogs');
const medicationsRoutes = require('./routes/medications');

// Use routes
app.use('/api/vitals', vitalLogsRoutes);
app.use('/api/medications', medicationsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MediTrack API is running!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meditrack')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}`);
});