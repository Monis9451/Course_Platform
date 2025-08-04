const supabase = require('../config/supabase');

const createModule = async ({ courseID, title, description, order, lessonNumber }) => {
    const {data, error} = await supabase.from('modules').insert([{
        courseID,
        title,
        description,
        order,
        lessonNumber
    }]).select();

    if (error) {
        throw new Error(`Error creating module: ${error.message}`);
    }
    return data;
}

const getAllModules = async () => {
    const {data, error} = await supabase.from('modules').select('*');

    if (error) {
        throw new Error(`Error fetching all modules: ${error.message}`);
    }
    return data;
}

const getModuleById = async (moduleID) => {
    const {data, error} = await supabase.from('modules').select('*').eq('moduleID', moduleID).single();

    if (error) {
        throw new Error(`Error fetching module by ID: ${error.message}`);
    }
    return data;
}

const getModulesByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('modules').select('*').eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching modules by course ID: ${error.message}`);
    }
    return data;
}

const updateModule = async (moduleID, updates) => {
    const {data, error} = await supabase.from('modules').update(updates).eq('moduleID', moduleID).select();
    if (error) {
        throw new Error(`Error updating module: ${error.message}`);
    }
    return data;
}

const deleteModule = async (moduleID) => {
    const {data, error} = await supabase.from('modules').delete().eq('moduleID', moduleID).select();
    if (error) {
        throw new Error(`Error deleting module: ${error.message}`);
    }
    return data;
}

const deleteModulesByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('modules').delete().eq('courseID', courseID).select();
    if (error) {
        throw new Error(`Error deleting modules by course ID: ${error.message}`);
    }
    return data;
}

module.exports = {
    createModule,
    getAllModules,
    getModuleById,
    getModulesByCourseId,
    updateModule,
    deleteModule,
    deleteModulesByCourseId
};