const { validationResult } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/Progress');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { cloudinary } = require('../middleware/upload');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filter object
  const filter = { published: true };
  
  if (req.query.category) {
    filter.category = req.query.category;
  }
  
  if (req.query.level) {
    filter.level = req.query.level;
  }

  // Build sort object
  let sort = {};
  if (req.query.sort) {
    const sortBy = req.query.sort;
    if (sortBy === 'price-low') sort.price = 1;
    else if (sortBy === 'price-high') sort.price = -1;
    else if (sortBy === 'rating') sort['rating.average'] = -1;
    else if (sortBy === 'popular') sort.enrollmentCount = -1;
    else sort.createdAt = -1;
  } else {
    sort.createdAt = -1;
  }

  const courses = await Course.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select('-modules'); // Exclude modules for performance

  const total = await Course.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: courses.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: {
      courses
    }
  });
});

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // If user is authenticated, check if they're enrolled
  let isEnrolled = false;
  let userProgress = null;
  
  if (req.user) {
    const user = await User.findById(req.user._id);
    isEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === course._id.toString()
    );
    
    if (isEnrolled) {
      userProgress = await Progress.findOne({
        user: req.user._id,
        course: course._id
      });
    }
  }

  res.status(200).json({
    success: true,
    data: {
      course,
      isEnrolled,
      userProgress
    }
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin/Instructor)
const createCourse = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const courseData = req.body;

  // Handle file uploads
  if (req.files) {
    if (req.files.thumbnail) {
      courseData.thumbnail = {
        public_id: req.files.thumbnail[0].filename,
        url: req.files.thumbnail[0].path
      };
    }
    
    if (req.files.preview) {
      courseData.preview = {
        public_id: req.files.preview[0].filename,
        url: req.files.preview[0].path
      };
    }
  }

  const course = await Course.create(courseData);

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: {
      course
    }
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin/Instructor)
const updateCourse = catchAsync(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const updateData = req.body;

  // Handle file uploads
  if (req.files) {
    if (req.files.thumbnail) {
      // Delete old thumbnail from cloudinary
      if (course.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(course.thumbnail.public_id);
      }
      
      updateData.thumbnail = {
        public_id: req.files.thumbnail[0].filename,
        url: req.files.thumbnail[0].path
      };
    }
    
    if (req.files.preview) {
      // Delete old preview from cloudinary
      if (course.preview?.public_id) {
        await cloudinary.uploader.destroy(course.preview.public_id);
      }
      
      updateData.preview = {
        public_id: req.files.preview[0].filename,
        url: req.files.preview[0].path
      };
    }
  }

  course = await Course.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: {
      course
    }
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin/Instructor)
const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Delete associated files from cloudinary
  if (course.thumbnail?.public_id) {
    await cloudinary.uploader.destroy(course.thumbnail.public_id);
  }
  
  if (course.preview?.public_id) {
    await cloudinary.uploader.destroy(course.preview.public_id);
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully'
  });
});

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
const getFeaturedCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({ 
    published: true, 
    featured: true 
  })
  .select('-modules')
  .limit(6)
  .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: courses.length,
    data: {
      courses
    }
  });
});

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
const getCoursesByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find({ 
    published: true, 
    category: category.toUpperCase() 
  })
  .select('-modules')
  .skip(skip)
  .limit(limit)
  .sort('-createdAt');

  const total = await Course.countDocuments({ 
    published: true, 
    category: category.toUpperCase() 
  });

  res.status(200).json({
    success: true,
    count: courses.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: {
      courses
    }
  });
});

// @desc    Search courses
// @route   GET /api/courses/search
// @access  Public
const searchCourses = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  
  if (!q) {
    return next(new AppError('Search query is required', 400));
  }

  const searchRegex = new RegExp(q, 'i');
  
  const courses = await Course.find({
    published: true,
    $or: [
      { title: searchRegex },
      { description: searchRegex },
      { instructor: searchRegex },
      { tags: { $in: [searchRegex] } }
    ]
  })
  .select('-modules')
  .sort('-rating.average');

  res.status(200).json({
    success: true,
    count: courses.length,
    data: {
      courses
    }
  });
});

// @desc    Add review to course
// @route   POST /api/courses/:id/reviews
// @access  Private
const addReview = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is enrolled
  const user = await User.findById(req.user._id);
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === course._id.toString()
  );

  if (!isEnrolled) {
    return next(new AppError('You must be enrolled in this course to leave a review', 403));
  }

  // Check if user already reviewed
  const existingReview = course.reviews.find(
    review => review.user.toString() === req.user._id.toString()
  );

  if (existingReview) {
    return next(new AppError('You have already reviewed this course', 400));
  }

  const { rating, comment } = req.body;

  course.reviews.push({
    user: req.user._id,
    rating,
    comment
  });

  // Recalculate average rating
  course.calculateAverageRating();
  await course.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully'
  });
});

// @desc    Get course reviews
// @route   GET /api/courses/:id/reviews
// @access  Public
const getReviews = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
    .populate('reviews.user', 'name avatar')
    .select('reviews rating');

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      reviews: course.reviews,
      rating: course.rating
    }
  });
});

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const user = await User.findById(req.user._id);

  // Check if already enrolled
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === course._id.toString()
  );

  if (isEnrolled) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  // Add course to user's enrolled courses
  user.enrolledCourses.push({
    course: course._id,
    enrolledAt: new Date()
  });

  // Increment course enrollment count
  course.enrollmentCount += 1;

  // Create progress record
  await Progress.create({
    user: user._id,
    course: course._id
  });

  await Promise.all([user.save(), course.save()]);

  res.status(200).json({
    success: true,
    message: 'Successfully enrolled in course'
  });
});

// @desc    Get course content (for enrolled users)
// @route   GET /api/courses/:id/content
// @access  Private
const getCourseContent = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is enrolled
  const user = await User.findById(req.user._id);
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === course._id.toString()
  );

  if (!isEnrolled) {
    return next(new AppError('You must be enrolled in this course to access content', 403));
  }

  // Get user's progress
  const progress = await Progress.findOne({
    user: req.user._id,
    course: course._id
  });

  res.status(200).json({
    success: true,
    data: {
      course,
      progress
    }
  });
});

module.exports = {
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
};
