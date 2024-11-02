const express = require('express');
const router = express.Router();
const WellnessInsight = require('../models/WellnessInsight');  // Assuming model is defined
const generateChatResponse = require('../utils/chatAI');  // AI function

// Endpoint to handle chatbot questions
router.post('/chatbot', async (req, res) => {
    const { user_id, message } = req.body;  // Pass user_id for personalization

    try {
        // Fetch user's latest wellness insights from the database
        const insights = await WellnessInsight.findOne({
            where: { user_id },
            order: [['recorded_at', 'DESC']]
        });

        // Generate response based on insights and user message
        const response = generateChatResponse(message, insights);
        res.json({ response });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ response: "Sorry, I'm unable to process your request." });
    }
});

module.exports = router;
