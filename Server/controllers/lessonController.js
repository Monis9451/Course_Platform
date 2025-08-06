const {
    createLessonWithoutContent,
    addingContentToLesson,
    getAllLessons,
    getLessonById,
    getLessonsByModuleId,
    getLessonsByCourseId,
    updateLesson,
    deleteLesson
} = require('../models/lessonModel.js');
const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const lessonWithoutContentHandler = catchAsync(async (req, res, next) => {
    const { moduleID, title, order, icon } = req.body;

    if (!moduleID || !title || !order) {
        return next(new AppError('Module ID, title, and order are required', 400));
    }

    const lesson = await createLessonWithoutContent(moduleID, title, order, icon);
    res.status(201).json({
        status: 'success',
        data: {
            lesson
        }
    });
});

const addContentToLessonHandler = catchAsync(async (req, res, next) => {
    const { lessonID, content } = req.body;

    if (!lessonID || !content) {
        return next(new AppError('Lesson ID and content are required', 400));
    }

    const updatedLesson = await addingContentToLesson(lessonID, content);
    res.status(200).json({
        status: 'success',
        data: {
            lesson: updatedLesson
        }
    });
});

const getAllLessonsHandler = catchAsync(async (req, res, next) => {
    const lessons = await getAllLessons();
    res.status(200).json({
        status: 'success',
        data: {
            lessons
        }
    });
});

const getLessonByIdHandler = catchAsync(async (req, res, next) => {
    const { lessonID } = req.params;

    if (!lessonID) {
        return next(new AppError('Lesson ID is required', 400));
    }

    const lesson = await getLessonById(lessonID);
    res.status(200).json({
        status: 'success',
        data: {
            lesson
        }
    });
});

const getLessonsByModuleIdHandler = catchAsync(async (req, res, next) => {
    const { moduleID } = req.params;

    if (!moduleID) {
        return next(new AppError('Module ID is required', 400));
    }

    const lessons = await getLessonsByModuleId(moduleID);
    res.status(200).json({
        status: 'success',
        data: {
            lessons
        }
    });
});

const getLessonsByCourseIdHandler = catchAsync(async (req, res, next) => {
    const { courseID } = req.params;

    if (!courseID) {
        return next(new AppError('Course ID is required', 400));
    }

    const lessons = await getLessonsByCourseId(courseID);
    res.status(200).json({
        status: 'success',
        data: {
            lessons
        }
    });
});

const updateLessonHandler = catchAsync(async (req, res, next) => {
    const { lessonID } = req.params;
    const updates = req.body;

    if (!lessonID) {
        return next(new AppError('Lesson ID is required', 400));
    }

    const updatedLesson = await updateLesson(lessonID, updates);
    res.status(200).json({
        status: 'success',
        data: {
            lesson: updatedLesson
        }
    });
});

const deleteLessonHandler = catchAsync(async (req, res, next) => {
    const { lessonID } = req.params;

    if (!lessonID) {
        return next(new AppError('Lesson ID is required', 400));
    }

    await deleteLesson(lessonID);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    createLessonWithoutContent: lessonWithoutContentHandler,
    addingContentToLesson: addContentToLessonHandler,
    getAllLessons: getAllLessonsHandler,
    getLessonById: getLessonByIdHandler,
    getLessonsByModuleId: getLessonsByModuleIdHandler,
    getLessonsByCourseId: getLessonsByCourseIdHandler,
    updateLesson: updateLessonHandler,
    deleteLesson: deleteLessonHandler
};
