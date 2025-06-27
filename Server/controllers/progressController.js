const { validationResult } = require('express-validator');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const User = require('../models/User');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// @desc    Get course progress for user
// @route   GET /api/progress/course/:courseId
// @access  Private
const getCourseProgress = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  // Check if user is enrolled in the course
  const user = await User.findById(req.user._id);
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === courseId
  );

  if (!isEnrolled) {
    return next(new AppError('You are not enrolled in this course', 403));
  }

  let progress = await Progress.findOne({
    user: req.user._id,
    course: courseId
  });

  // Create progress record if it doesn't exist
  if (!progress) {
    progress = await Progress.create({
      user: req.user._id,
      course: courseId
    });
  }

  // Calculate current progress
  await progress.calculateProgress();
  await progress.save();

  res.status(200).json({
    success: true,
    data: {
      progress
    }
  });
});

// @desc    Update lesson progress
// @route   PUT /api/progress/lesson
// @access  Private
const updateLessonProgress = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { moduleId, lessonId, timeSpent = 0 } = req.body;

  // Find or create progress record
  let progress = await Progress.findOne({
    user: req.user._id,
    course: req.body.courseId
  });

  if (!progress) {
    return next(new AppError('Progress record not found', 404));
  }

  // Update time spent
  progress.timeSpent += timeSpent;
  progress.lastAccessedAt = new Date();

  await progress.save();

  res.status(200).json({
    success: true,
    message: 'Lesson progress updated',
    data: {
      progress
    }
  });
});

// @desc    Mark lesson as completed
// @route   POST /api/progress/lesson/complete
// @access  Private
const markLessonCompleted = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { moduleId, lessonId, timeSpent = 0, courseId } = req.body;

  // Find progress record
  let progress = await Progress.findOne({
    user: req.user._id,
    course: courseId
  });

  if (!progress) {
    return next(new AppError('Progress record not found', 404));
  }

  // Mark lesson as completed
  const wasAdded = progress.markLessonCompleted(moduleId, lessonId, timeSpent);

  if (!wasAdded) {
    return next(new AppError('Lesson is already completed', 400));
  }

  // Recalculate overall progress
  await progress.calculateProgress();
  await progress.save();

  // Update user's enrolled course progress
  const user = await User.findById(req.user._id);
  const enrollmentIndex = user.enrolledCourses.findIndex(
    enrollment => enrollment.course.toString() === courseId
  );

  if (enrollmentIndex !== -1) {
    user.enrolledCourses[enrollmentIndex].progress = progress.overallProgress;
    user.enrolledCourses[enrollmentIndex].completed = progress.completed;
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: 'Lesson marked as completed',
    data: {
      progress,
      lessonCompleted: true,
      overallProgress: progress.overallProgress
    }
  });
});

// @desc    Submit quiz result
// @route   POST /api/progress/quiz
// @access  Private
const submitQuizResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { moduleId, lessonId, score, answers, courseId } = req.body;

  // Find progress record
  let progress = await Progress.findOne({
    user: req.user._id,
    course: courseId
  });

  if (!progress) {
    return next(new AppError('Progress record not found', 404));
  }

  // Get the course to check passing score
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Find the specific lesson to get passing score
  let passingScore = 70; // default
  for (const module of course.modules) {
    if (module._id.toString() === moduleId) {
      const lesson = module.lessons.find(l => l._id.toString() === lessonId);
      if (lesson && lesson.quiz && lesson.quiz.passingScore) {
        passingScore = lesson.quiz.passingScore;
      }
      break;
    }
  }

  const passed = score >= passingScore;

  // Check if quiz was already attempted
  const existingQuizIndex = progress.quizResults.findIndex(
    quiz => quiz.moduleId.toString() === moduleId && 
            quiz.lessonId.toString() === lessonId
  );

  if (existingQuizIndex !== -1) {
    // Update existing quiz result
    const existingQuiz = progress.quizResults[existingQuizIndex];
    existingQuiz.score = Math.max(existingQuiz.score, score); // Keep best score
    existingQuiz.passed = existingQuiz.score >= passingScore;
    existingQuiz.attempts += 1;
    existingQuiz.completedAt = new Date();
  } else {
    // Add new quiz result
    progress.quizResults.push({
      moduleId,
      lessonId,
      score,
      passed,
      attempts: 1
    });
  }

  progress.lastAccessedAt = new Date();
  await progress.save();

  res.status(200).json({
    success: true,
    message: 'Quiz result submitted',
    data: {
      score,
      passed,
      passingScore,
      progress: progress.overallProgress
    }
  });
});

// @desc    Get certificate for completed course
// @route   GET /api/progress/certificate/:courseId
// @access  Private
const getCertificate = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const progress = await Progress.findOne({
    user: req.user._id,
    course: courseId
  });

  if (!progress) {
    return next(new AppError('Progress record not found', 404));
  }

  if (!progress.completed) {
    return next(new AppError('Course not completed yet', 400));
  }

  if (!progress.certificate.issued) {
    return next(new AppError('Certificate not generated yet', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      certificate: progress.certificate
    }
  });
});

// @desc    Generate certificate for completed course
// @route   POST /api/progress/certificate/:courseId/generate
// @access  Private
const generateCertificate = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const progress = await Progress.findOne({
    user: req.user._id,
    course: courseId
  }).populate('course', 'title instructor');

  if (!progress) {
    return next(new AppError('Progress record not found', 404));
  }

  if (!progress.completed) {
    return next(new AppError('Course must be completed to generate certificate', 400));
  }

  if (progress.certificate.issued) {
    return next(new AppError('Certificate already generated', 400));
  }

  // Generate certificate ID
  const certificateId = `CERT-${Date.now()}-${req.user._id.toString().slice(-6)}`;

  // In a real application, you would generate an actual certificate PDF here
  // For now, we'll just create a placeholder URL
  const certificateUrl = `${process.env.BASE_URL}/certificates/${certificateId}.pdf`;

  progress.certificate = {
    issued: true,
    issuedAt: new Date(),
    certificateId,
    downloadUrl: certificateUrl
  };

  await progress.save();

  res.status(200).json({
    success: true,
    message: 'Certificate generated successfully',
    data: {
      certificate: progress.certificate
    }
  });
});

module.exports = {
  getCourseProgress,
  updateLessonProgress,
  markLessonCompleted,
  submitQuizResult,
  getCertificate,
  generateCertificate
};
