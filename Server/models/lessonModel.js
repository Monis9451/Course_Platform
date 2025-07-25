const supabase = require('../config/supabase');

const createLesson = async (moduleID, title, contentType, content, order) => {
    const {data, error} = await supabase.from('lesson').insert([{
        moduleId,
        title,
        contentType,
        content,
        order
    }]);
    if (error) {
        throw new Error(`Error creating lesson: ${error.message}`);
    }
    return data;
}

const getAllLessons = async () => {
    const {data, error} = await supabase.from('lesson').select('*');
    if (error) {
        throw new Error(`Error fetching all lessons: ${error.message}`);
    }
    return data;
}

const getLessonById = async (lessonID) => {
    const {data, error} = await supabase.from('lesson').select('*').eq('lessonID', lessonID).single();
    if (error) {
        throw new Error(`Error fetching lesson by ID: ${error.message}`);
    }
    return data;
}

const getLessonsByModuleId = async (moduleID) => {
    const {data, error} = await supabase.from('lesson').select('*').eq('moduleID', moduleID);
    if (error) {
        throw new Error(`Error fetching lessons by module ID: ${error.message}`);
    }
    return data;
}

const getLessonsByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('lesson').select('*').eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching lessons by course ID: ${error.message}`);
    }
    return data;
}

const updateLesson = async (lessonID, updates) => {
    const {data, error} = await supabase.from('lesson').update(updates).eq('lessonID', lessonID);
    if (error) {
        throw new Error(`Error updating lesson: ${error.message}`);
    }
    return data;
}

const deleteLesson = async (lessonID) => {
    const {data, error} = await supabase.from('lesson').delete().eq('lessonID', lessonID);
    if (error) {
        throw new Error(`Error deleting lesson: ${error.message}`);
    }
    return data;
}

module.exports = {
    createLesson,
    getAllLessons,
    getLessonById,
    getLessonsByModuleId,
    getLessonsByCourseId,
    updateLesson,
    deleteLesson
};