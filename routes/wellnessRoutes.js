const express = require('express');
const router = express.Router();
const WellnessInsight = require('../models/WellnessInsight'); // Assuming model is defined in models/WellnessInsight.js

// Get all wellness insights
router.get('/', async (req, res) => {
    try {
        const insights = await WellnessInsight.findAll();
        res.json({ success: true, data: insights });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving wellness insights", error });
    }
});
// Create a new wellness insight record
router.post('/record', async (req, res) => {
    const { user_id, sleep_hours, stress_level, mood, heart_rate, hydration_level } = req.body;
    try {
        const newRecord = await WellnessInsight.create({ user_id, sleep_hours, stress_level, mood, heart_rate, hydration_level });
        res.json({ message: "Wellness insight recorded successfully", newRecord });
    } catch (error) {
        res.status(500).json({ message: "Error recording wellness insight", error });
    }
});

// Fetch the latest wellness insight for a specific user
router.get('/latest/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        // Retrieve the latest record for the user
        const latestInsight = await WellnessInsight.findOne({
            where: { user_id },
            order: [['recorded_at', 'DESC']],
        });
        
        if (latestInsight) {
            res.json({ success: true, data: latestInsight });
        } else {
            res.status(404).json({ success: false, message: "No wellness insight found for the user" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving wellness insights", error });
    }
});

// Add a new data stream
router.post('/add-stream', (req, res) => {
    res.json({ success: true, message: "Stream added successfully" });
});

// Scan wearable for live data
router.post('/scan-wearable', async (req, res) => {
    try {
        const { user_id } = req.body;

        // Dummy data, replace with actual wearable device API
        const newInsight = await WellnessInsight.create({
            user_id,
            sleep_hours: (Math.random() * 8).toFixed(2),
            stress_level: Math.floor(Math.random() * 10),
            mood: "Relaxed",
            heart_rate: Math.floor(Math.random() * 40 + 60),
            hydration_level: (Math.random() * 2).toFixed(2)
        });

        res.json({ success: true, data: newInsight });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error scanning wearable.", error });
    }
});

module.exports = router;