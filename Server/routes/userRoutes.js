const express = require('express');
const { body } = require('express-validator');
const {
  getUserProfile,
  updateProfile,
  updateAvatar,
  getEnrolledCourses,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getPaymentHistory,
  deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// All routes are protected
router.use(protect);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateProfileValidation, updateProfile);
router.put('/avatar', upload.single('avatar'), updateAvatar);

// Course related routes
router.get('/enrolled-courses', getEnrolledCourses);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:courseId', addToWishlist);
router.delete('/wishlist/:courseId', removeFromWishlist);

// Payment history
router.get('/payment-history', getPaymentHistory);

// Account deletion
router.delete('/account', deleteAccount);

module.exports = router;
