const express = require('express');
const { body } = require('express-validator');
const {
  getCourseProgress,
  updateLessonProgress,
  markLessonCompleted,
  submitQuizResult,
  getCertificate,
  generateCertificate
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const lessonProgressValidation = [
  body('moduleId')
    .isMongoId()
    .withMessage('Invalid module ID'),
  body('lessonId')
    .isMongoId()
    .withMessage('Invalid lesson ID'),
  body('timeSpent')
    .optional()
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a positive number')
];

const quizResultValidation = [
  body('moduleId')
    .isMongoId()
    .withMessage('Invalid module ID'),
  body('lessonId')
    .isMongoId()
    .withMessage('Invalid lesson ID'),
  body('score')
    .isNumeric()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
  body('answers')
    .isArray()
    .withMessage('Answers must be an array')
];

// All routes are protected
router.use(protect);

// Progress routes
router.get('/course/:courseId', getCourseProgress);
router.put('/lesson', lessonProgressValidation, updateLessonProgress);
router.post('/lesson/complete', lessonProgressValidation, markLessonCompleted);
router.post('/quiz', quizResultValidation, submitQuizResult);

// Certificate routes
router.get('/certificate/:courseId', getCertificate);
router.post('/certificate/:courseId/generate', generateCertificate);

module.exports = router;
