const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api', feedbackRoutes);

// Optional: fallback to index.html for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
