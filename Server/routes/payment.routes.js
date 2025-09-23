const express = require('express');
const { createPaymentIntent, confirmPayment, checkCourseAccess } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create payment intent (protected route)
router.post('/create-payment-intent', auth, createPaymentIntent);

// Confirm payment (protected route)
router.post('/confirm-payment', auth, confirmPayment);

// Check course access (protected route)
router.get('/check-access/:courseId', auth, checkCourseAccess);

module.exports = router;