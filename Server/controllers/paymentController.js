const stripe = require('../config/stripe');
const { createEnrollment, checkUserCourseAccess } = require('../models/enrollmentModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

// Course pricing data (should match frontend)
const coursePricing = {
  1: { price: 75, title: "Unburdening Trauma: A 6-Week Self-Paced Workshop" },
  2: { price: 75, title: "Unburdening Love: A 6-Week Self-Paced Workshop" },
  3: { price: 120, title: "Unburdening Love + Trauma: The 12-Week Self-Paced Healing Bundle" }
};

// Create payment intent
const createPaymentIntent = catchAsync(async (req, res, next) => {
  const { courseId } = req.body;
  const { userID } = req.user;

  if (!courseId) {
    return next(new AppError('Course ID is required', 400));
  }

  // Get course pricing
  const courseData = coursePricing[courseId];
  if (!courseData) {
    return next(new AppError('Invalid course ID', 400));
  }

  try {
    // Check if user already has access to this course
    const hasAccess = await checkUserCourseAccess(userID, courseId);
    if (hasAccess) {
      return next(new AppError('You already have access to this course', 400));
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: courseData.price * 100, // Convert to cents
      currency: 'gbp',
      metadata: {
        courseId: courseId.toString(),
        userId: userID.toString(),
        courseTitle: courseData.title
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      courseTitle: courseData.title,
      amount: courseData.price
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    return next(new AppError('Failed to create payment intent', 500));
  }
});

// Confirm payment and create enrollment (for development)
const confirmPayment = catchAsync(async (req, res, next) => {
  const { paymentIntentId, courseId } = req.body;
  const { userID } = req.user;

  if (!paymentIntentId || !courseId) {
    return next(new AppError('Payment intent ID and course ID are required', 400));
  }

  try {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Check if enrollment already exists
      const hasAccess = await checkUserCourseAccess(userID, courseId);

      if (!hasAccess) {
        // Create enrollment record
        await createEnrollment(userID, courseId, 0);
      }

      res.status(200).json({
        success: true,
        message: 'Payment confirmed and enrollment created',
        enrolled: true
      });
    } else {
      return next(new AppError('Payment not successful', 400));
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return next(new AppError('Failed to confirm payment', 500));
  }
});

// Check if user has access to a course
const checkCourseAccess = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { userID, isAdmin } = req.user;

  // Admin has access to all courses
  if (isAdmin) {
    return res.status(200).json({
      success: true,
      hasAccess: true,
      reason: 'admin'
    });
  }

  try {
    const hasAccess = await checkUserCourseAccess(userID, courseId);
    
    res.status(200).json({
      success: true,
      hasAccess,
      reason: hasAccess ? 'purchased' : 'not_purchased'
    });
  } catch (error) {
    console.error('Course access check error:', error);
    return next(new AppError('Failed to check course access', 500));
  }
});

module.exports = {
  createPaymentIntent,
  confirmPayment,
  checkCourseAccess
};