const express = require('express');
const verifyFirebaseToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { createLessonWithoutContent, addingContentToLesson } = require('../controllers/lessonController.js');

const router = express.Router();

router.post('/without-content', verifyFirebaseToken, isAdmin, createLessonWithoutContent);
router.post('/add-content', verifyFirebaseToken, isAdmin, addingContentToLesson);

module.exports = router;