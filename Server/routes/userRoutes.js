const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../models/userModel');
const router = express.Router();

router.get('/me', async (req, res) => {
    const user = req.user;
    try {
        const userData = await getUserById(user.uid);
        res.status(200).json({message:'User authenticated', userData});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

router.post('/create', async (req, res) => {
    const { userID, username, email } = req.body;
    try {
        const newUser = await createUser({ userID, username, email });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
})

router.get('/all', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const updatedUser = await updateUser(id, { username, email });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;