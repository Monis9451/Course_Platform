const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const verifySupabaseToken = require('../middleware/authMiddleware');

// Create progress
router.post('/', verifySupabaseToken, progressController.createProgress);

// Get all progress
router.get('/', verifySupabaseToken, progressController.getAllProgress);

// Get progress by ID
router.get('/:id', verifySupabaseToken, progressController.getProgressById);

// Get progress by user ID
router.get('/user/:userId', verifySupabaseToken, progressController.getProgressByUserId);

// Get progress by course ID
router.get('/course/:courseId', verifySupabaseToken, progressController.getProgressByCourseId);

// Get specific user's progress for a specific course (temporarily without auth for testing)
router.get('/user/:userId/course/:courseId', progressController.getUserCourseProgress);

// Update progress
router.put('/:id', verifySupabaseToken, progressController.updateProgress);

// Delete progress
router.delete('/:id', verifySupabaseToken, progressController.deleteProgress);

// Save or update progress (upsert operation)
router.post('/save', verifySupabaseToken, progressController.saveOrUpdateProgress);

// Course progress routes (temporarily without auth for testing)
router.get('/course-progress/:userId/:courseId', progressController.getCourseProgress);
router.post('/course-progress/save', progressController.saveCourseProgress);

module.exports = router;
