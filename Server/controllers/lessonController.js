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

module.exports = {
    createLessonWithoutContent: lessonWithoutContentHandler,
    addingContentToLesson: addContentToLessonHandler
};
