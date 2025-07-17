const express = require('express');
const User = require('../models/user'); // Fix case sensitivity if needed
const router = express.Router();
const authMiddleware = require('../middleware/auth');

/**
 * @route   POST /api/users/register
 * @desc    Register a new user in MongoDB after Firebase authentication
 * @access  Public
 * 
 * This route is called ONLY during signup after Firebase has created the user
 * Frontend will send the Firebase UID, email, and displayName to store in MongoDB
 */
router.post('/register', async (req, res) => {
    try {
        const {firebaseUid, email, displayName} = req.body;
        
        if (!firebaseUid) {
            return res.status(400).json({
                success: false,
                message: 'Firebase UID is required'
            });
        }

        // Check if user already exists in our database
        const existingUser = await User.findOne({firebaseUid});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists in database'
            });
        }

        // Create new user in MongoDB with data from Firebase
        const newUser = new User({
            firebaseUid,
            email,
            displayName,
            role: 'user' // Default role for new users
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully in database', 
            user: newUser
        });
    }
    catch(error) {
        console.error('Error registering user in database:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user in database',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile from MongoDB
 * @access  Private (requires Firebase authentication)
 * 
 * This route uses Firebase authentication to validate the user
 * and returns the user profile data from MongoDB
 */
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in database'
            });
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message
        });
    }
});

module.exports = router;