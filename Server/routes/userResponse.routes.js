const express = require('express');
const { 
    getUserResponsesByLesson,
    saveUserResponse,
    getAllUserResponses,
    deleteUserResponse,
    batchSaveUserResponses
} = require('../controllers/userResponseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get all user responses
router.get('/', getAllUserResponses);

// Get user responses for a specific lesson
router.get('/lesson/:lessonId', getUserResponsesByLesson);

// Save or update user response for a specific component
router.post('/lesson/:lessonId/component/:componentId', saveUserResponse);

// Delete user response for a specific component
router.delete('/lesson/:lessonId/component/:componentId', deleteUserResponse);

// Batch save multiple responses for a lesson
router.post('/lesson/:lessonId/batch', batchSaveUserResponses);

module.exports = router;
