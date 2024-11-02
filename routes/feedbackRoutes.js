const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit Feedback
router.post('/', async (req, res) => {
    const { userName, userEmail, userMessage } = req.body;
    
    try {
        const feedback = await Feedback.create({ userName, userEmail, userMessage });
        res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
        res.status(500).json({ message: "Error submitting feedback", error });
    }
});

// Get All Feedback (Admin or Viewing Purpose)
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.status(200).json({ feedbacks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback", error });
    }
});

// Get Feedback by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByPk(id);
        if (feedback) {
            res.status(200).json({ feedback });
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback", error });
    }
});

// Delete Feedback by ID (Admin Purposes)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByPk(id);
        if (feedback) {
            await feedback.destroy();
            res.status(200).json({ message: "Feedback deleted successfully" });
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting feedback", error });
    }
});

module.exports = router;
