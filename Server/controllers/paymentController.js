const stripe = require('../config/stripe');
const { createEnrollment, checkUserCourseAccess } = require('../models/enrollmentModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

// Course pricing data (updated for database IDs)
const coursePricing = {
  23: { price: 75, title: "Unburdening Trauma: A 6-Week Self-Paced Workshop" },
  30: { price: 75, title: "Unburdening Love: A 6-Week Self-Paced Workshop" },
  32: { price: 120, title: "Unburdening Love + Trauma: The 12-Week Self-Paced Healing Bundle" }
};

// Create payment intent
const createPaymentIntent = catchAsync(async (req, res, next) => {
  const { amount, currency, description, metadata } = req.body;
  const { id: userID } = req.user;

  if (!amount || !currency || !description) {
    return next(new AppError('Amount, currency, and description are required', 400));
  }

  try {
    const { courseIds = [], isBundle = false } = metadata || {};

    // Check if user already has access to the course(s)
    if (courseIds.length > 0) {
      const accessChecks = await Promise.all(
        courseIds.map(courseId => checkUserCourseAccess(userID, courseId))
      );
      
      if (isBundle) {
        // For bundle, check if user has access to all courses
        if (accessChecks.every(hasAccess => hasAccess)) {
          return next(new AppError('You already have access to all courses in this bundle', 400));
        }
      } else {
        // For individual course
        if (accessChecks[0]) {
          return next(new AppError('You already have access to this course', 400));
        }
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount), // Amount should be in cents
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
        userId: userID.toString(),
        description: description,
        courseIds: JSON.stringify(courseIds),
        isBundle: isBundle.toString()
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    return next(new AppError('Failed to create payment intent', 500));
  }
});

// Confirm payment and create enrollment (for development)
const confirmPayment = catchAsync(async (req, res, next) => {
  const { paymentIntentId } = req.body;
  const { id: userID } = req.user;

  if (!paymentIntentId) {
    return next(new AppError('Payment intent ID is required', 400));
  }

  try {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      const { courseIds, isBundle } = paymentIntent.metadata;
      const courseIdsArray = courseIds ? JSON.parse(courseIds) : [];

      if (courseIdsArray.length === 0) {
        return next(new AppError('No course IDs found in payment metadata', 400));
      }

      // Create enrollments for all courses
      const enrollmentPromises = courseIdsArray.map(async (courseId) => {
        const hasAccess = await checkUserCourseAccess(userID, courseId);
        if (!hasAccess) {
          await createEnrollment(userID, courseId, 0);
          return courseId;
        }
        return null;
      });

      const enrolledCourses = (await Promise.all(enrollmentPromises)).filter(Boolean);

      res.status(200).json({
        success: true,
        message: isBundle === 'true' 
          ? `Payment confirmed. You now have access to ${enrolledCourses.length} courses in the bundle!`
          : 'Payment confirmed and enrollment created',
        enrolled: true,
        enrolledCourses: enrolledCourses,
        isBundle: isBundle === 'true'
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
  const { id: userID, isAdmin } = req.user;

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