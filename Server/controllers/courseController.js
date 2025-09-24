const { createCourse,
        getAllCourses,
        getCourseById,
        getCourseWithDetails,
        updateCourse,
        deleteCourse,
        deleteCourseWithCascade,
        getIncompleteCourses,
        getIncompleteCoursesWithDetails,
        markCourseAsCompleted } = require('../models/courseModel.js');
const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const createCourseHandler = catchAsync(async (req, res, next) => {
  const { title, description, imageURL, moduleNumbers } = req.body;

  if (!title) {
    return next(new AppError('Course title is required', 400));
  }

  const newCourse = await createCourse(
    title, 
    description || '', 
    imageURL || '', 
    moduleNumbers || []
  );

  res.status(201).json({
    status: 'success',
    message: 'Course created successfully!',
    data: {
      course: newCourse,
    },
  });
});

const getAllCoursesHandler = catchAsync(async (req, res, next) => {
  const courses = await getAllCourses();

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

const getCourseByIdHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const course = await getCourseById(id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

const getCourseWithDetailsHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const course = await getCourseWithDetails(id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

const updateCourseHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, imageURL, moduleNumbers } = req.body;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (imageURL !== undefined) updateData.imageURL = imageURL;
  if (moduleNumbers !== undefined) updateData.moduleNumbers = moduleNumbers;

  const updatedCourse = await updateCourse(id, updateData);

  if (!updatedCourse || updatedCourse.length === 0) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Course updated successfully!',
    data: {
      course: updatedCourse,
    },
  });
});

const deleteCourseHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const deletedCourse = await deleteCourseWithCascade(id);

  if (!deletedCourse) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Course and related data deleted successfully',
    data: null,
  });
});

const getIncompleteCoursesHandler = catchAsync(async (req, res, next) => {
  const incompleteCourses = await getIncompleteCourses();

  res.status(200).json({
    status: 'success',
    results: incompleteCourses.length,
    data: {
      courses: incompleteCourses,
    },
  });
});

const getIncompleteCoursesWithDetailsHandler = catchAsync(async (req, res, next) => {
  const incompleteCoursesWithDetails = await getIncompleteCoursesWithDetails();

  res.status(200).json({
    status: 'success',
    results: incompleteCoursesWithDetails.length,
    data: {
      courses: incompleteCoursesWithDetails,
    },
  });
});

const markCourseAsCompletedHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const completedCourse = await markCourseAsCompleted(id);

  if (!completedCourse) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Course marked as completed successfully!',
    data: {
      course: completedCourse,
    },
  });
});

module.exports = {
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  getCourseWithDetailsHandler,
  updateCourseHandler,
  deleteCourseHandler,
  getIncompleteCoursesHandler,
  getIncompleteCoursesWithDetailsHandler,
  markCourseAsCompletedHandler
};