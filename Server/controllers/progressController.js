const progressModel = require('../models/progressModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createProgress = catchAsync(async (req, res, next) => {
    const { userID, courseID, moduleID, lessonID, status, progressPercentage } = req.body;

    if (!userID || !courseID || !moduleID || !lessonID || status === undefined || progressPercentage === undefined) {
        return next(new AppError('All fields are required', 400));
    }

    // Check if progress already exists for this user, course, module, and lesson
    const existingProgress = await progressModel.getProgressByUserCourseModuleLesson(userID, courseID, moduleID, lessonID);
    
    if (existingProgress) {
        // Update existing progress if new percentage is higher
        if (progressPercentage > existingProgress.progressPercentage) {
            const updatedProgress = await progressModel.updateProgress(existingProgress.progressID, {
                status,
                progressPercentage,
                updated_at: new Date()
            });
            
            res.status(200).json({
                success: true,
                message: 'Progress updated successfully',
                data: updatedProgress
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Progress already exists with higher percentage',
                data: existingProgress
            });
        }
    } else {
        const progress = await progressModel.createProgress(userID, courseID, moduleID, lessonID, status, progressPercentage);
        
        res.status(201).json({
            success: true,
            message: 'Progress created successfully',
            data: progress
        });
    }
});

const getAllProgress = catchAsync(async (req, res, next) => {
    const progress = await progressModel.getAllProgress();
    
    res.status(200).json({
        success: true,
        message: 'Progress fetched successfully',
        data: progress
    });
});

const getProgressById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const progress = await progressModel.getProgressById(id);
    
    if (!progress) {
        return next(new AppError('Progress not found', 404));
    }
    
    res.status(200).json({
        success: true,
        message: 'Progress fetched successfully',
        data: progress
    });
});

const getProgressByUserId = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    
    const progress = await progressModel.getProgressByUserId(userId);
    
    res.status(200).json({
        success: true,
        message: 'User progress fetched successfully',
        data: progress
    });
});

const getProgressByCourseId = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    
    const progress = await progressModel.getProgressByCourseId(courseId);
    
    res.status(200).json({
        success: true,
        message: 'Course progress fetched successfully',
        data: progress
    });
});

const getUserCourseProgress = catchAsync(async (req, res, next) => {
    const { userId, courseId } = req.params;
    
    const progress = await progressModel.getUserCourseProgress(userId, courseId);
    
    res.status(200).json({
        success: true,
        message: 'User course progress fetched successfully',
        data: progress
    });
});

const updateProgress = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    
    // Add updated_at timestamp
    updates.updated_at = new Date();
    
    const progress = await progressModel.updateProgress(id, updates);
    
    res.status(200).json({
        success: true,
        message: 'Progress updated successfully',
        data: progress
    });
});

const deleteProgress = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const progress = await progressModel.deleteProgress(id);
    
    res.status(200).json({
        success: true,
        message: 'Progress deleted successfully',
        data: progress
    });
});

const saveOrUpdateProgress = catchAsync(async (req, res, next) => {
    const { userID, courseID, moduleID, lessonID, status, progressPercentage } = req.body;

    if (!userID || !courseID || !moduleID || !lessonID || status === undefined || progressPercentage === undefined) {
        return next(new AppError('All fields are required', 400));
    }

    try {
        // Check if progress already exists
        const existingProgress = await progressModel.getProgressByUserCourseModuleLesson(userID, courseID, moduleID, lessonID);
        
        if (existingProgress) {
            // Update only if new percentage is higher
            if (progressPercentage > existingProgress.progressPercentage) {
                const updatedProgress = await progressModel.updateProgress(existingProgress.progressID, {
                    status,
                    progressPercentage,
                    updated_at: new Date()
                });
                
                res.status(200).json({
                    success: true,
                    message: 'Progress updated successfully',
                    data: updatedProgress
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Progress maintained (current percentage is higher or equal)',
                    data: existingProgress
                });
            }
        } else {
            // Create new progress
            const progress = await progressModel.createProgress(userID, courseID, moduleID, lessonID, status, progressPercentage);
            
            res.status(201).json({
                success: true,
                message: 'Progress created successfully',
                data: progress
            });
        }
    } catch (error) {
        console.error('Error in saveOrUpdateProgress:', error);
        return next(new AppError('Failed to save progress', 500));
    }
});

module.exports = {
    createProgress,
    getAllProgress,
    getProgressById,
    getProgressByUserId,
    getProgressByCourseId,
    getUserCourseProgress,
    updateProgress,
    deleteProgress,
    saveOrUpdateProgress
};
