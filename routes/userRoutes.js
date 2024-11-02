const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Render Registration Page
router.get('/register', (req, res) => {
    res.render('register', { message: null }); // Initialize with no message
});

router.post('/register', async (req, res) => {
    const { username, email, password, date_of_birth, gender } = req.body;

    try {
        const password_hash = await bcrypt.hash(password, 10); // Hash the password before storing
        const newUser = await User.create({
            username,
            email,
            password_hash,
            date_of_birth,
            gender,
        });
        res.redirect('/api/users/login'); // Redirect to login page after successful registration
    } catch (error) {
        res.render('register', { message: "Error registering user. Please try again." });
    }
});
router.get('/login', (req, res) => {
    res.render('login', { message: null }); // Initialize with no message
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password_hash)) {
            // Successful login - redirect or render success page
            res.redirect('/api/wellnessinsight'); // Change this to the appropriate route
        } else {
            // Login failed - render login with error message
            res.render('login', { message: "Invalid credentials. Please try again." });
        }
    } catch (error) {
        // Handle other errors
        res.status(500).render('login', { message: "An error occurred during login." });
    }
});
  
// Render User Profile Page
router.get('/profile', async (req, res) => {
    const user_id = req.user ? req.user.user_id : null;
    try {
        const user = await User.findOne({ where: { user_id } });
        if (user) {
            res.render('profile', { user }); // Render profile.ejs with user data
        } else {
            res.status(404).render('error', { message: "User not found" });
        }
    } catch (error) {
        res.status(500).render('error', { message: "Error fetching user profile", error });
    }
});

// Update User Profile (EJS form submission)
router.post('/profile/update', async (req, res) => {
    const { username, email } = req.body;
    const user_id = req.user ? req.user.user_id : null;
    try {
        const user = await User.findOne({ where: { user_id } });
        if (user) {
            user.username = username;
            user.email = email;
            await user.save();
            res.render('profile', { message: "User profile updated successfully", user }); // Render updated profile
        } else {
            res.status(404).render('error', { message: "User not found" });
        }
    } catch (error) {
        res.status(500).render('error', { message: "Error updating user profile", error });
    }
});

// Delete User Profile
router.post('/profile/delete', async (req, res) => {
    const user_id = req.user ? req.user.user_id : null;
    try {
        const user = await User.findOne({ where: { user_id } });
        if (user) {
            await user.destroy();
            res.render('goodbye', { message: "User profile deleted successfully" }); // Render a goodbye or deletion confirmation page
        } else {
            res.status(404).render('error', { message: "User not found" });
        }
    } catch (error) {
        res.status(500).render('error', { message: "Error deleting user profile", error });
    }
});

module.exports = router;
