const express = require('express');
const { sendFeedbackEmail, testEmailConfig } = require('../controllers/emailController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation middleware for feedback
const validateFeedback = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  
  body('name')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  
  body('mostHelpful')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Most helpful section must be less than 1000 characters'),
  
  body('improvements')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Improvements section must be less than 1000 characters'),
  
  body('personalChanges')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Personal changes section must be less than 1000 characters'),
  
  body('additionalComments')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Additional comments must be less than 1000 characters'),
  
  body('anonymous')
    .optional()
    .isBoolean()
    .withMessage('Anonymous must be a boolean value'),

  body('courseName')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Course name must be between 1 and 200 characters'),

  // Custom validation to ensure email is provided when not anonymous
  body().custom((value, { req }) => {
    if (!req.body.anonymous && !req.body.email) {
      throw new Error('Email is required when not submitting anonymously');
    }
    return true;
  })
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Routes
router.post('/feedback', validateFeedback, handleValidationErrors, sendFeedbackEmail);
router.get('/test-config', testEmailConfig);

module.exports = router;
