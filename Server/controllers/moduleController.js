const {
    createModule,
    getAllModules,
    getModuleById,
    getModulesByCourseId,
    updateModule,
    deleteModule
} = require('../models/moduleModel.js');
const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const createModuleHandler = catchAsync(async (req, res, next) => {
    const { courseID, title, description, order, lessonNumber } = req.body;

    // Check for missing required fields
    if (!courseID) {
        return next(new AppError('courseID is required', 400));
    }
    if (!title) {
        return next(new AppError('title is required', 400));
    }
    if (!description) {
        return next(new AppError('description is required', 400));
    }
    if (order === undefined || order === null) {
        return next(new AppError('order is required', 400));
    }
    if (lessonNumber === undefined || lessonNumber === null) {
        return next(new AppError('lessonNumber is required', 400));
    }

    // Validate that lessonNumber is at least 1
    if (lessonNumber < 1) {
        return next(new AppError('Lesson number must be at least 1', 400));
    }

    // Validate that order is positive
    if (order < 1) {
        return next(new AppError('Module order must be at least 1', 400));
    }

    const newModule = await createModule({ courseID, title, description, order, lessonNumber });

    return res.status(201).json({
        status: 'success',
        data: {
            module: newModule
        }
    });
});

const getAllModulesHandler = catchAsync(async (req, res, next) => {
    const modules = await getAllModules();

    res.status(200).json({
        status: 'success',
        results: modules.length,
        data: {
            modules,
        },
    });
});

const getModuleByIdHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new AppError('Module ID is required', 400));
    }

    const module = await getModuleById(id);

    if (!module) {
        return next(new AppError('Module not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            module,
        },
    });
});

const getModulesByCourseIdHandler = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    const modules = await getModulesByCourseId(courseId);

    res.status(200).json({
        status: 'success',
        results: modules.length,
        data: {
            modules,
        },
    });
});

const updateModuleHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, order, lessonNumber } = req.body;

    if (!id) {
        return next(new AppError('Module ID is required', 400));
    }

    const updatedModule = await updateModule(id, { title, description, order, lessonNumber });

    if (!updatedModule) {
        return next(new AppError('Module not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Module updated successfully!',
        data: {
            module: updatedModule,
        },
    });
});

const deleteModuleHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new AppError('Module ID is required', 400));
    }

    const deletedModule = await deleteModule(id);

    if (!deletedModule) {
        return next(new AppError('Module not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

module.exports = {
    createModuleHandler,
    getAllModulesHandler,
    getModuleByIdHandler,
    getModulesByCourseIdHandler,
    updateModuleHandler,
    deleteModuleHandler
};