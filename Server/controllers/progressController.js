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

// Get course progress (overall progress and lesson completion)
const getCourseProgress = catchAsync(async (req, res, next) => {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
        return next(new AppError('User ID and Course ID are required', 400));
    }

    try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

        const { data: courseProgress, error } = await supabase
            .from('course_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Course progress fetched successfully',
            data: courseProgress || {
                overall_progress_percentage: 0,
                completed_lessons: [],
                lesson_progress: {},
                last_accessed_lesson: null
            }
        });
    } catch (error) {
        console.error('Error in getCourseProgress:', error);
        return next(new AppError('Failed to fetch course progress', 500));
    }
});

// Save course progress (overall progress and lesson completion)
const saveCourseProgress = catchAsync(async (req, res, next) => {
    const { userId, courseId, overallProgressPercentage, completedLessons, lessonProgress, lastAccessedLesson } = req.body;

    // DEBUG: Log received data
    console.log('=== RECEIVED COURSE PROGRESS DATA ===');
    console.log('Request Body:', req.body);
    console.log('User ID:', userId);
    console.log('Course ID:', courseId);
    console.log('Overall Progress %:', overallProgressPercentage);
    console.log('Completed Lessons:', completedLessons);
    console.log('Lesson Progress:', lessonProgress);
    console.log('Last Accessed Lesson:', lastAccessedLesson);
    console.log('====================================');

    if (!userId || !courseId || overallProgressPercentage === undefined) {
        return next(new AppError('User ID, Course ID, and overall progress percentage are required', 400));
    }

    try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

        const progressData = {
            user_id: userId,
            course_id: courseId,
            overall_progress_percentage: overallProgressPercentage,
            completed_lessons: completedLessons || [],
            lesson_progress: lessonProgress || {},
            last_accessed_lesson: lastAccessedLesson || null,
            updated_at: new Date().toISOString()
        };

        console.log('=== PROGRESS DATA TO SAVE IN DB ===');
        console.log('Progress Data:', progressData);
        console.log('===================================');

        // Try to update existing record first
        const { data: existingData, error: fetchError } = await supabase
            .from('course_progress')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        let result;
        if (existingData) {
            // Update existing record
            const { data, error } = await supabase
                .from('course_progress')
                .update(progressData)
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // Create new record
            progressData.created_at = new Date().toISOString();
            const { data, error } = await supabase
                .from('course_progress')
                .insert(progressData)
                .select()
                .single();

            if (error) throw error;
            result = data;
        }

        console.log('=== DATABASE OPERATION RESULT ===');
        console.log('Operation:', existingData ? 'UPDATE' : 'INSERT');
        console.log('Result:', result);
        console.log('================================');

        res.status(200).json({
            success: true,
            message: 'Course progress saved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in saveCourseProgress:', error);
        return next(new AppError('Failed to save course progress', 500));
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
    saveOrUpdateProgress,
    getCourseProgress,
    saveCourseProgress
};
