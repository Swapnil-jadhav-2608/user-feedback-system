// backend/routes/feedbackRoutes.js 
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedbackText, category } = req.body;
    
    const feedback = new Feedback({
      name,
      email,
      feedbackText,
      category: category || 'suggestion'
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all feedback with optional filtering and sorting
router.get('/feedback', async (req, res) => {
  try {
    const { category, sort } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }

    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const feedbacks = await Feedback.find(query).sort(sortOption);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;