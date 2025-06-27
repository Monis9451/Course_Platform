const { validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { cloudinary } = require('../middleware/upload');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('enrolledCourses.course', 'title thumbnail duration')
    .populate('wishlist', 'title thumbnail price');

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 400, errors.array()));
  }

  const { name, email } = req.body;
  
  // Check if email is already taken by another user
  if (email && email !== req.user.email) {
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.user._id } 
    });
    
    if (existingUser) {
      return next(new AppError('Email is already taken', 400));
    }
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
const updateAvatar = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an avatar image', 400));
  }

  const user = await User.findById(req.user._id);

  // Delete old avatar from cloudinary
  if (user.avatar?.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  // Update avatar
  user.avatar = {
    public_id: req.file.filename,
    url: req.file.path
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
    data: {
      avatar: user.avatar
    }
  });
});

// @desc    Get enrolled courses
// @route   GET /api/users/enrolled-courses
// @access  Private
const getEnrolledCourses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'enrolledCourses.course',
      select: 'title thumbnail instructor duration price rating'
    });

  res.status(200).json({
    success: true,
    count: user.enrolledCourses.length,
    data: {
      enrolledCourses: user.enrolledCourses
    }
  });
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('wishlist', 'title thumbnail instructor price rating duration');

  res.status(200).json({
    success: true,
    count: user.wishlist.length,
    data: {
      wishlist: user.wishlist
    }
  });
});

// @desc    Add course to wishlist
// @route   POST /api/users/wishlist/:courseId
// @access  Private
const addToWishlist = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const user = await User.findById(req.user._id);

  // Check if course is already in wishlist
  if (user.wishlist.includes(req.params.courseId)) {
    return next(new AppError('Course is already in your wishlist', 400));
  }

  // Check if user is already enrolled
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.course.toString() === req.params.courseId
  );

  if (isEnrolled) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  user.wishlist.push(req.params.courseId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Course added to wishlist successfully'
  });
});

// @desc    Remove course from wishlist
// @route   DELETE /api/users/wishlist/:courseId
// @access  Private
const removeFromWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // Check if course is in wishlist
  if (!user.wishlist.includes(req.params.courseId)) {
    return next(new AppError('Course is not in your wishlist', 400));
  }

  user.wishlist = user.wishlist.filter(
    courseId => courseId.toString() !== req.params.courseId
  );
  
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Course removed from wishlist successfully'
  });
});

// @desc    Get payment history
// @route   GET /api/users/payment-history
// @access  Private
const getPaymentHistory = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('paymentHistory.course', 'title thumbnail')
    .select('paymentHistory');

  res.status(200).json({
    success: true,
    count: user.paymentHistory.length,
    data: {
      paymentHistory: user.paymentHistory
    }
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // Delete avatar from cloudinary
  if (user.avatar?.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});

module.exports = {
  getUserProfile,
  updateProfile,
  updateAvatar,
  getEnrolledCourses,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getPaymentHistory,
  deleteAccount
};
