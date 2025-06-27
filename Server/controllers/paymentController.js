const { validationResult } = require('express-validator');
const Stripe = require('stripe');
const User = require('../models/User');
const Course = require('../models/Course');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
const createPaymentIntent = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { courseId, amount, currency = 'usd' } = req.body;

  // Verify course exists and get actual price
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is already enrolled
  const user = await User.findById(req.user._id);
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === courseId
  );

  if (isEnrolled) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  // Verify amount matches course price
  if (amount !== course.price) {
    return next(new AppError('Invalid payment amount', 400));
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        courseId,
        userId: req.user._id.toString(),
        courseName: course.title
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    return next(new AppError('Payment intent creation failed', 500));
  }
});

// @desc    Confirm payment and enroll user
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = catchAsync(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return next(new AppError('Payment intent ID is required', 400));
  }

  try {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return next(new AppError('Payment has not been completed', 400));
    }

    const { courseId, userId } = paymentIntent.metadata;

    // Verify user matches
    if (userId !== req.user._id.toString()) {
      return next(new AppError('Unauthorized payment confirmation', 403));
    }

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return next(new AppError('Course or user not found', 404));
    }

    // Check if already enrolled (prevent double enrollment)
    const isEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === courseId
    );

    if (!isEnrolled) {
      // Enroll user in course
      user.enrolledCourses.push({
        course: courseId,
        enrolledAt: new Date()
      });

      // Add to payment history
      user.paymentHistory.push({
        paymentId: paymentIntentId,
        amount: paymentIntent.amount / 100, // Convert back from cents
        currency: paymentIntent.currency,
        course: courseId,
        status: 'completed'
      });

      // Increment course enrollment count
      course.enrollmentCount += 1;

      // Remove from wishlist if present
      user.wishlist = user.wishlist.filter(
        wishlistCourseId => wishlistCourseId.toString() !== courseId
      );

      await Promise.all([user.save(), course.save()]);
    }

    res.status(200).json({
      success: true,
      message: 'Payment confirmed and enrollment completed',
      data: {
        course: {
          id: course._id,
          title: course.title
        }
      }
    });
  } catch (error) {
    return next(new AppError('Payment confirmation failed', 500));
  }
});

// @desc    Get payment status
// @route   GET /api/payments/status/:paymentId
// @access  Private
const getPaymentStatus = catchAsync(async (req, res, next) => {
  const { paymentId } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    res.status(200).json({
      success: true,
      data: {
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata
      }
    });
  } catch (error) {
    return next(new AppError('Unable to retrieve payment status', 500));
  }
});

// @desc    Process refund
// @route   POST /api/payments/refund
// @access  Private (Admin only)
const processRefund = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { paymentId, reason } = req.body;

  try {
    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      reason: 'requested_by_customer',
      metadata: {
        reason: reason || 'Admin processed refund'
      }
    });

    // Update payment history in database
    const user = await User.findOne({
      'paymentHistory.paymentId': paymentId
    });

    if (user) {
      const paymentIndex = user.paymentHistory.findIndex(
        payment => payment.paymentId === paymentId
      );

      if (paymentIndex !== -1) {
        user.paymentHistory[paymentIndex].status = 'refunded';
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status
      }
    });
  } catch (error) {
    return next(new AppError('Refund processing failed', 500));
  }
});

// @desc    Handle Stripe webhooks
// @route   POST /api/payments/webhook
// @access  Public (Stripe webhook)
const webhookHandler = catchAsync(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Additional processing if needed
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Update payment status in database
      const user = await User.findOne({
        'paymentHistory.paymentId': failedPayment.id
      });

      if (user) {
        const paymentIndex = user.paymentHistory.findIndex(
          payment => payment.paymentId === failedPayment.id
        );

        if (paymentIndex !== -1) {
          user.paymentHistory[paymentIndex].status = 'failed';
          await user.save();
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

module.exports = {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
  processRefund,
  webhookHandler
};
