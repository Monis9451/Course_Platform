const express = require('express');
const { body } = require('express-validator');
const {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
  processRefund,
  webhookHandler
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createPaymentValidation = [
  body('courseId')
    .isMongoId()
    .withMessage('Invalid course ID'),
  body('amount')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('currency')
    .optional()
    .isIn(['usd', 'eur', 'gbp'])
    .withMessage('Invalid currency')
];

const refundValidation = [
  body('paymentId')
    .notEmpty()
    .withMessage('Payment ID is required'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Reason cannot exceed 500 characters')
];

// Webhook route (must be before other middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// Protected routes
router.use(protect);

router.post('/create-intent', createPaymentValidation, createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/status/:paymentId', getPaymentStatus);

// Admin routes
router.post('/refund', authorize('admin'), refundValidation, processRefund);

module.exports = router;
