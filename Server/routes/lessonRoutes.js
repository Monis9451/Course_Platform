const express = require('express');
const verifySupabaseToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { createLessonWithoutContent, addingContentToLesson } = require('../controllers/lessonController.js');

const router = express.Router();

router.post('/without-content', verifySupabaseToken, isAdmin, createLessonWithoutContent);
router.post('/add-content', verifySupabaseToken, isAdmin, addingContentToLesson);

module.exports = router;