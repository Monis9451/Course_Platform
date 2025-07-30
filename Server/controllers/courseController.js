import { createCourse,
        getAllCourses,
        getCourseById,
        updateCourse,
        deleteCourse } from '../models/courseModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const createCourseHandler = catchAsync(async (req, res, next) => {
  const { title, description, imageURL, moduleNumbers } = req.body;

  if (!title) {
    return next(new AppError('Course title is required', 400));
  }

  const newCourse = await createCourse(title, description || '', imageURL || '', moduleNumbers || []);

  res.status(201).json({
    status: 'success',
    message: 'Course created successfully!',
    data: {
      course: newCourse,
    },
  });
});

export const getAllCoursesHandler = catchAsync(async (req, res, next) => {
  const courses = await getAllCourses();

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

export const getCourseByIdHandler = catchAsync(async (req, res, next) => {
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

export const updateCourseHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, imageURL, moduleNumbers } = req.body;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const updatedCourse = await updateCourse(id, { title, description, imageURL, moduleNumbers });

  if (!updatedCourse) {
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

export const deleteCourseHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Course ID is required', 400));
  }

  const deletedCourse = await deleteCourse(id);

  if (!deletedCourse) {
    return next(new AppError('Course not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});