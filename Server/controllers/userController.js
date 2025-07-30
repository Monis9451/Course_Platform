const express = require('express');
const { createUser,
        getAllUsers,
        getUserById, 
        getUserByEmail, 
        updateUser, 
        deleteUser } = require('../models/userModel');
const router = express.Router();

const adminDashboardHandler = async (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the admin dashboard',
        success: true,
        user: req.user 
    });
}

const adminCheckHandler =  async (req, res) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdminUser = req.user?.email === adminEmail;
    
    res.status(200).json({
        isAdmin: isAdminUser,
        success: true,
        email: req.user?.email
    });
}

const getUserProfile =  async (req, res) => {
    const user = req.user;
    try {
        const userData = await getUserById(user.uid);
        res.status(200).json({message:'User authenticated', userData});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
}

const registerUserHandler = async (req, res) => {
    const user = req.user;
    
    try {
        const userData = await getUserById(user.uid);
        
        if (!userData) {
            return res.status(404).json({
                error: 'User not found in database',
                success: false
            });
        }
        
        res.status(200).json({
            message: 'User authenticated', 
            userData,
            success: true
        });
    } catch (error) {
        console.error('Error in POST /me:', error);
        res.status(500).json({ 
            error: 'Failed to fetch user data',
            success: false 
        });
    }
}

const getUserByEmailHandler = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ error: 'Failed to fetch user by email' });
    }
}

const createUserHandler = async (req, res) => {
    const { userID, username, email } = req.body;
    try {
        const existingUser = await getUserById(userID);
        if (existingUser) {
            return res.status(200).json({ 
                message: 'User already exists', 
                user: existingUser,
                success: true 
            });
        }

        const newUserData = await createUser({ userID, username, email });
        const newUser = Array.isArray(newUserData) ? newUserData[0] : newUserData;
        res.status(201).json({ 
            message: 'User created successfully', 
            user: newUser,
            success: true 
        });
    } catch (error) {
        console.error('Error creating user:', error);
        
        if (error.message && error.message.includes('duplicate key')) {
            try {
                const existingUser = await getUserById(userID);
                if (existingUser) {
                    return res.status(200).json({ 
                        message: 'User already exists', 
                        user: existingUser,
                        success: true 
                    });
                }
            } catch (fetchError) {
                console.error('Error fetching existing user:', fetchError);
            }
        }
        
        res.status(500).json({ 
            error: 'Failed to create user',
            success: false 
        });
    }
}

const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

const updateUserHandler = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const updatedUser = await updateUser(id, { username, email });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

exports = {
    adminDashboardHandler,
    adminCheckHandler,
    getUserProfile,
    registerUserHandler,
    getUserByEmailHandler,
    createUserHandler,
    getAllUsersHandler,
    updateUserHandler,
    deleteUserHandler
};