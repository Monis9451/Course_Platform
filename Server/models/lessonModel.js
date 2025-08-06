const supabase = require('../config/supabase');

const createLessonWithoutContent = async (moduleID, title, order, icon = 'page') => {
    const {data, error} = await supabase.from('lesson').insert([{
        moduleID,
        title,
        content: '',
        order,
        icon
    }]).select();
    if (error) {
        throw new Error(`Error creating lesson: ${error.message}`);
    }
    return data;
}

const addingContentToLesson = async (lessonID, content) => {
    const {data, error} = await supabase.from('lesson').update({content}).eq('lessonID', lessonID).select();
    if (error) {
        throw new Error(`Error adding content to lesson: ${error.message}`);
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
    // First get all modules for this course
    const {data: modules, error: moduleError} = await supabase
        .from('modules')
        .select('moduleID')
        .eq('courseID', courseID);
    
    if (moduleError) {
        throw new Error(`Error fetching modules for course: ${moduleError.message}`);
    }
    
    if (!modules || modules.length === 0) {
        return []; // No modules, so no lessons
    }
    
    // Extract module IDs
    const moduleIDs = modules.map(module => module.moduleID);
    
    // Get all lessons for these modules
    const {data, error} = await supabase
        .from('lesson')
        .select('*')
        .in('moduleID', moduleIDs);
        
    if (error) {
        throw new Error(`Error fetching lessons by course ID: ${error.message}`);
    }
    return data;
}

const updateLesson = async (lessonID, updates) => {
    const {data, error} = await supabase.from('lesson').update(updates).eq('lessonID', lessonID).select();
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
    createLessonWithoutContent,
    addingContentToLesson,
    getAllLessons,
    getLessonById,
    getLessonsByModuleId,
    getLessonsByCourseId,
    updateLesson,
    deleteLesson
};