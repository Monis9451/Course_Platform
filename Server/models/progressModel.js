const supabase = require('../config/supabase');

const createProgress = async (userID, courseID, moduleID, lessonID, status, progressPercentage) => {
    const {data, error} = await supabase.from('progress').insert([{
        userID,
        courseID,
        moduleID,
        lessonID,
        status,
        progressPercentage
    }]);
    if (error) {
        throw new Error(`Error creating progress: ${error.message}`);
    }
    return data;
};

const getAllProgress = async () => {
    const {data, error} = await supabase.from('progress').select('*');
    if (error) {
        throw new Error(`Error fetching all progress: ${error.message}`);
    }
    return data;
};

const getProgressById = async (progressID) => {
    const {data, error} = await supabase.from('progress').select('*').eq('progressID', progressID).single();
    if (error) {
        throw new Error(`Error fetching progress by ID: ${error.message}`);
    }
    return data;
};

const getProgressByUserId = async (userID) => {
    const {data, error} = await supabase.from('progress').select('*').eq('userID', userID);
    if (error) {
        throw new Error(`Error fetching progress by user ID: ${error.message}`);
    }
    return data;
}

const getProgressByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('progress').select('*').eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching progress by course ID: ${error.message}`);
    }
    return data;
};

const getProgressByModuleId = async (moduleID) => {
    const {data, error} = await supabase.from('progress').select('*').eq('moduleID', moduleID);
    if (error) {
        throw new Error(`Error fetching progress by module ID: ${error.message}`);
    }
    return data;
};

const getProgressByLessonId = async (lessonID) => {
    const {data, error} = await supabase.from('progress').select('*').eq('lessonID', lessonID);
    if (error) {
        throw new Error(`Error fetching progress by lesson ID: ${error.message}`);
    }
    return data;
}

const getProgressByUserCourseModuleLesson = async (userID, courseID, moduleID, lessonID) => {
    const {data, error} = await supabase.from('progress')
        .select('*')
        .eq('userID', userID)
        .eq('courseID', courseID)
        .eq('moduleID', moduleID)
        .eq('lessonID', lessonID)
        .single();
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw new Error(`Error fetching progress by user, course, module, and lesson: ${error.message}`);
    }
    return data;
};

const getUserCourseProgress = async (userID, courseID) => {
    const {data, error} = await supabase.from('progress')
        .select('*')
        .eq('userID', userID)
        .eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching user course progress: ${error.message}`);
    }
    return data;
};

const updateProgress = async (progressID, updates) => {
    const {data, error} = await supabase.from('progress').update(updates).eq('progressID', progressID);
    if (error) {
        throw new Error(`Error updating progress: ${error.message}`);
    }
    return data;
};

const deleteProgress = async (progressID) => {
    const {data, error} = await supabase.from('progress').delete().eq('progressID', progressID);
    if (error) {
        throw new Error(`Error deleting progress: ${error.message}`);
    }
    return data;
}

module.exports = {
    createProgress,
    getAllProgress,
    getProgressById,
    getProgressByUserId,
    getProgressByCourseId,
    getProgressByModuleId,
    getProgressByLessonId,
    getProgressByUserCourseModuleLesson,
    getUserCourseProgress,
    updateProgress,
    deleteProgress
};