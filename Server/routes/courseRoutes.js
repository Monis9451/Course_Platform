const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getFeaturedCourses,
  getCoursesByCategory,
  searchCourses,
  addReview,
  getReviews,
  enrollInCourse,
  getCourseContent
} = require('../controllers/courseController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const createCourseValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  body('instructor')
    .trim()
    .notEmpty()
    .withMessage('Instructor name is required'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Duration is required'),
  body('category')
    .isIn(['TRAUMA HEALING', 'RELATIONSHIPS', 'MENTAL HEALTH', 'PERSONAL GROWTH', 'BUNDLE'])
    .withMessage('Invalid category'),
  body('level')
    .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL LEVELS'])
    .withMessage('Invalid level')
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters')
];

// Public routes (some with optional auth for personalization)
router.get('/', optionalAuth, getAllCourses);
router.get('/featured', getFeaturedCourses);
router.get('/search', searchCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/:id', optionalAuth, getCourseById);
router.get('/:id/reviews', getReviews);

// Protected routes
router.post('/:id/enroll', protect, enrollInCourse);
router.post('/:id/reviews', protect, reviewValidation, addReview);
router.get('/:id/content', protect, getCourseContent);

// Admin/Instructor routes
router.post(
  '/',
  protect,
  authorize('admin', 'instructor'),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'preview', maxCount: 1 }
  ]),
  createCourseValidation,
  createCourse
);

router.put(
  '/:id',
  protect,
  authorize('admin', 'instructor'),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'preview', maxCount: 1 }
  ]),
  updateCourse
);

router.delete(
  '/:id',
  protect,
  authorize('admin', 'instructor'),  deleteCourse
);

module.exports = router;
