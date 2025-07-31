const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { createLessonWithoutContent, addingContentToLesson } = require('../controllers/lessonController.js');

const router = express.Router();

router.post('/without-content', isAdmin, createLessonWithoutContent);
router.post('/add-content', isAdmin, addingContentToLesson);

module.exports = router;