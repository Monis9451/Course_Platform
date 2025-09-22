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

// Admin-only routes for reading lessons (restricted access)
router.get('/', verifySupabaseToken, isAdmin, getAllLessons);
router.get('/:lessonID', verifySupabaseToken, isAdmin, getLessonById);
router.get('/module/:moduleID', verifySupabaseToken, isAdmin, getLessonsByModuleId);
router.get('/course/:courseID', verifySupabaseToken, isAdmin, getLessonsByCourseId);

module.exports = router;