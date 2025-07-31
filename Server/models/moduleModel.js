const supabase = require('../config/supabase');

const createModule = async (courseID, title, description, order, lessonNumber) => {
    const {data, error} = await supabase.from('module').insert([{
        courseID,
        title,
        description,
        order,
        lessonNumber
    }]);

    if (error) {
        throw new Error(`Error creating module: ${error.message}`);
    }
    return data;
}

const getAllModules = async () => {
    const {data, error} = await supabase.from('module').select('*');

    if (error) {
        throw new Error(`Error fetching all modules: ${error.message}`);
    }
    return data;
}

const getModuleById = async (moduleID) => {
    const {data, error} = await supabase.from('module').select('*').eq('moduleID', moduleID).single();

    if (error) {
        throw new Error(`Error fetching module by ID: ${error.message}`);
    }
    return data;
}

const getModulesByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('module').select('*').eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching modules by course ID: ${error.message}`);
    }
    return data;
}

const updateModule = async (moduleID, updates) => {
    const {data, error} = await supabase.from('module').update(updates).eq('moduleID', moduleID);
    if (error) {
        throw new Error(`Error updating module: ${error.message}`);
    }
    return data;
}

const deleteModule = async (moduleID) => {
    const {data, error} = await supabase.from('module').delete().eq('moduleID', moduleID);
    if (error) {
        throw new Error(`Error deleting module: ${error.message}`);
    }
    return data;
}

module.exports = {
    createModule,
    getAllModules,
    getModuleById,
    getModulesByCourseId,
    updateModule,
    deleteModule
};