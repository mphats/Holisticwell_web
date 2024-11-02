const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Adjust this path to your database config

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For handling form data

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main page (landing page with dynamic content)
app.get('/', (req, res) => {
    res.render('index', {
        heroImage: '/images/o.jpeg',            // Path to hero image
        heroOverlayImage: '/images/j.jpeg',  // Path to overlay image
        logoImage: '/images/m.jpeg',            // Path to logo image
        feedbackImage: '/images/g.jpeg',    // Path to feedback image
        features: [
            { icon: 'fas fa-heartbeat', color: '#3b82f6', title: 'Health Monitoring', description: 'Track your health metrics such as heart rate, stress, and sleep.' },
            { icon: 'fas fa-brain', color: '#10b981', title: 'AI-Driven Insights', description: 'Receive insights tailored to your health data and routines.' },
            { icon: 'fas fa-calendar-check', color: '#ec4899', title: 'Smart Reminders', description: 'Get reminders for hydration, exercise, relaxation, and more.' }
        ],
        testimonials: [
            { message: 'This platform has improved my health and wellbeing.', user_name: 'Alice B.' },
            { message: 'I appreciate the AI-driven insights and daily reminders.', user_name: 'John D.' },
            { message: 'HolisticWell360 has helped me develop better health habits.', user_name: 'Mary S.' }
        ]
    });
});

// Mount API routes
app.use('/api/users', require('./routes/userRoutes'));          // User API routes (registration, login, profile)
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/wellnessinsight', require('./routes/wellnessRoutes'));    // Feedback API route

// Sync database and start the server
sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("Server running on http://localhost:5000");
    });
});
