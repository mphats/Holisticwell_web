const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const generateAlert = require('../utils/alerts'); // Import the AI alert model

// Fetch recent activities and check for real-time alerts
router.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        // Fetch recent activities with the new fields included
        const activities = await Activity.findAll({
            where: { user_id },
            order: [['activity_date', 'DESC']],
            limit: 10
        });

        // Calculate alert based on recent activities (example: average stress level if available)
        const recentActivityLevel = activities.length / 10;
        const recentStressLevel = activities.reduce((sum, activity) => sum + (activity.stress_level || 0), 0) / activities.length;
        const alert = generateAlert(recentStressLevel, recentActivityLevel);

        res.json({
            activities: activities.map(activity => ({
                activity_type: activity.activity_type,
                duration_minutes: activity.duration_minutes,
                calories_burned: activity.calories_burned,
                steps_count: activity.steps_count,
                activity_date: activity.activity_date
            })),
            alert: alert ? "Consider a relaxation break." : null
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Failed to fetch activities." });
    }
});

module.exports = router;
