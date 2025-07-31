const express = require('express');
const verifyFirebaseToken = require('../middleware/authMiddleware');
const router = express.Router();
const { isAdmin } = require('../middleware/isAdminMiddleware');
const { adminDashboardHandler, 
        adminCheckHandler, 
        getUserProfile, 
        registerUserHandler, 
        getUserByEmailHandler,
        createUserHandler,
        getAllUsersHandler,
        updateUserHandler,
        deleteUserHandler } = require('../controllers/userController');

router.get('/admin/dashboard', verifyFirebaseToken, isAdmin, adminDashboardHandler);

router.get('/admin/check', verifyFirebaseToken, adminCheckHandler);

router.get('/me', verifyFirebaseToken, getUserProfile);

router.post('/me', verifyFirebaseToken, registerUserHandler);

// This route should not require authentication as it's used for checking user existence
router.get('/email/:email', getUserByEmailHandler);

router.post('/create', verifyFirebaseToken, createUserHandler);

router.get('/all', verifyFirebaseToken, isAdmin, getAllUsersHandler);

router.put('/update/:id', verifyFirebaseToken, updateUserHandler);

router.delete('/delete/:id', verifyFirebaseToken, deleteUserHandler);

module.exports = router;