// backend/models/Feedback.js 
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  feedbackText: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['suggestion', 'bug', 'feature', 'other'],
    default: 'suggestion'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);