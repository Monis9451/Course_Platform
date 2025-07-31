import {
    createLessonWithoutContent,
    addingContentToLesson,
    getAllLessons,
    getLessonById,
    getLessonsByModuleId,
    getLessonsByCourseId,
    updateLesson,
    deleteLesson
} from '../models/moduleModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const lessonWithoutContentHandler = catchAsync(async (req, res, next) => {
    const { moduleID, title, order } = req.body;

    if (!moduleID || !title || !order) {
        return next(new AppError('Module ID, title, and order are required', 400));
    }

    const lesson = await createLessonWithoutContent(moduleID, title, order);
    res.status(201).json({
        status: 'success',
        data: {
            lesson
        }
    });
});

export const addContentToLessonHandler = catchAsync(async (req, res, next) => {
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
