const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const supabase = require('../config/supabase');

// Get user responses for a specific lesson
const getUserResponsesByLesson = catchAsync(async (req, res, next) => {
    const { lessonId } = req.params;
    const userId = req.user.id;

    if (!lessonId) {
        return next(new AppError('Lesson ID is required', 400));
    }

    try {
        const { data, error } = await supabase
            .from('user_responses')
            .select('*')
            .eq('user_id', userId)
            .eq('lesson_id', lessonId);

        if (error) {
            return next(new AppError('Error fetching user responses', 500));
        }

        // Transform data to match frontend format
        const responsesByComponent = {};
        data.forEach(response => {
            responsesByComponent[response.component_id] = {
                ...response.response_data,
                id: response.id,
                createdAt: response.created_at,
                updatedAt: response.updated_at
            };
        });

        res.status(200).json({
            status: 'success',
            data: responsesByComponent
        });
    } catch (error) {
        return next(new AppError('Error fetching user responses', 500));
    }
});

// Save or update user response for a specific component
const saveUserResponse = catchAsync(async (req, res, next) => {
    const { lessonId, componentId } = req.params;
    const { componentType, responseData } = req.body;
    const userId = req.user.id;

    if (!lessonId || !componentId || !responseData) {
        return next(new AppError('Lesson ID, Component ID, and response data are required', 400));
    }

    try {
        // Check if response already exists
        const { data: existingResponse, error: fetchError } = await supabase
            .from('user_responses')
            .select('id')
            .eq('user_id', userId)
            .eq('lesson_id', lessonId)
            .eq('component_id', componentId)
            .single();

        let result;
        
        if (existingResponse && !fetchError) {
            // Update existing response
            const { data, error } = await supabase
                .from('user_responses')
                .update({
                    response_data: responseData,
                    component_type: componentType,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existingResponse.id)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // Create new response
            const { data, error } = await supabase
                .from('user_responses')
                .insert({
                    user_id: userId,
                    lesson_id: lessonId,
                    component_id: componentId,
                    component_type: componentType,
                    response_data: responseData
                })
                .select()
                .single();

            if (error) throw error;
            result = data;
        }

        res.status(200).json({
            status: 'success',
            message: 'Response saved successfully',
            data: {
                ...result.response_data,
                id: result.id,
                createdAt: result.created_at,
                updatedAt: result.updated_at
            }
        });
    } catch (error) {
        console.error('Error saving user response:', error);
        return next(new AppError('Error saving user response', 500));
    }
});

// Get all user responses for a specific user
const getAllUserResponses = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('user_responses')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            return next(new AppError('Error fetching user responses', 500));
        }

        // Transform data to match frontend format: { lessonId: { componentId: responseData } }
        const responsesByLesson = {};
        data.forEach(response => {
            if (!responsesByLesson[response.lesson_id]) {
                responsesByLesson[response.lesson_id] = {};
            }
            responsesByLesson[response.lesson_id][response.component_id] = {
                ...response.response_data,
                id: response.id,
                createdAt: response.created_at,
                updatedAt: response.updated_at
            };
        });

        res.status(200).json({
            status: 'success',
            data: responsesByLesson
        });
    } catch (error) {
        return next(new AppError('Error fetching user responses', 500));
    }
});

// Delete a specific user response
const deleteUserResponse = catchAsync(async (req, res, next) => {
    const { lessonId, componentId } = req.params;
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('user_responses')
            .delete()
            .eq('user_id', userId)
            .eq('lesson_id', lessonId)
            .eq('component_id', componentId);

        if (error) {
            return next(new AppError('Error deleting user response', 500));
        }

        res.status(200).json({
            status: 'success',
            message: 'Response deleted successfully'
        });
    } catch (error) {
        return next(new AppError('Error deleting user response', 500));
    }
});

// Batch save multiple responses for a lesson
const batchSaveUserResponses = catchAsync(async (req, res, next) => {
    const { lessonId } = req.params;
    const { responses } = req.body; // Array of { componentId, componentType, responseData }
    const userId = req.user.id;

    if (!lessonId || !responses || !Array.isArray(responses)) {
        return next(new AppError('Lesson ID and responses array are required', 400));
    }

    try {
        const results = [];
        
        for (const response of responses) {
            const { componentId, componentType, responseData } = response;
            
            // Check if response already exists
            const { data: existingResponse, error: fetchError } = await supabase
                .from('user_responses')
                .select('id')
                .eq('user_id', userId)
                .eq('lesson_id', lessonId)
                .eq('component_id', componentId)
                .single();

            let result;
            
            if (existingResponse && !fetchError) {
                // Update existing response
                const { data, error } = await supabase
                    .from('user_responses')
                    .update({
                        response_data: responseData,
                        component_type: componentType,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existingResponse.id)
                    .select()
                    .single();

                if (error) throw error;
                result = data;
            } else {
                // Create new response
                const { data, error } = await supabase
                    .from('user_responses')
                    .insert({
                        user_id: userId,
                        lesson_id: lessonId,
                        component_id: componentId,
                        component_type: componentType,
                        response_data: responseData
                    })
                    .select()
                    .single();

                if (error) throw error;
                result = data;
            }
            
            results.push({
                componentId,
                ...result.response_data,
                id: result.id,
                createdAt: result.created_at,
                updatedAt: result.updated_at
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Responses saved successfully',
            data: results
        });
    } catch (error) {
        console.error('Error batch saving user responses:', error);
        return next(new AppError('Error saving user responses', 500));
    }
});

module.exports = {
    getUserResponsesByLesson,
    saveUserResponse,
    getAllUserResponses,
    deleteUserResponse,
    batchSaveUserResponses
};
