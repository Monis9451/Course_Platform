const express = require('express');
const verifySupabaseToken = require('../middleware/authMiddleware');
const router = express.Router();
const { isAdmin } = require('../middleware/isAdminMiddleware');
const { adminDashboardHandler, 
        adminCheckHandler,
        getUserProfile, 
        getUserByEmailHandler,
        getAllUsersHandler } = require('../controllers/userController');

// Admin routes
router.get('/admin/dashboard', verifySupabaseToken, isAdmin, adminDashboardHandler);
router.get('/admin/check', verifySupabaseToken, adminCheckHandler);

// User profile routes
router.get('/me', verifySupabaseToken, getUserProfile);

// User management routes (admin only)
router.get('/email/:email', verifySupabaseToken, isAdmin, getUserByEmailHandler);
router.get('/all', verifySupabaseToken, isAdmin, getAllUsersHandler);

module.exports = router;