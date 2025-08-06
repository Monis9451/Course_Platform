const express = require('express');
const verifySupabaseToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { 
    createLessonWithoutContent, 
    addingContentToLesson,
    getAllLessons,
    getLessonById,
    getLessonsByModuleId,
    getLessonsByCourseId,
    updateLesson,
    deleteLesson
} = require('../controllers/lessonController.js');

const router = express.Router();

// Admin routes for creating/updating lessons
router.post('/without-content', verifySupabaseToken, isAdmin, createLessonWithoutContent);
router.post('/add-content', verifySupabaseToken, isAdmin, addingContentToLesson);
router.put('/:lessonID', verifySupabaseToken, isAdmin, updateLesson);
router.delete('/:lessonID', verifySupabaseToken, isAdmin, deleteLesson);

// Public routes for reading lessons (could be protected if needed)
router.get('/', getAllLessons);
router.get('/:lessonID', getLessonById);
router.get('/module/:moduleID', getLessonsByModuleId);
router.get('/course/:courseID', getLessonsByCourseId);

module.exports = router;