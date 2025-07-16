const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res)=>{
    try{
        const {firebaseUid, email, displayName, role} = req.body;

        const existingUser = await User.findOne({firebaseUid});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = new User({
            firebaseUid,
            email,
            displayName,
            role
        });

        await newUser.save();
        res.status(201).json({message: 'User registered successfully', user: newUser});
    }
    catch(error) {
        res.status(500).json({
            success:false,
            message: 'Error registering user',
            error: error.message
        });
    }
})

module.exports = router;