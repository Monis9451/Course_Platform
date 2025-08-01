const supabase = require('../config/supabase');

const createCourse = async (title, description, imageURL, moduleNumbers) => {
    const {data, error} = await supabase.from('course').insert([{
        title,
        description,
        imageURL,
        moduleNumbers
    }]).select()

    if (error) {
        throw new Error(`Error creating course: ${error.message}`);
    }
    return data;
}

const getAllCourses = async () => {
    const {data, error} = await supabase.from('course').select('*');

    if (error) {
        throw new Error(`Error fetching all courses: ${error.message}`);
    }
    return data;
}

const getCourseById = async (courseID) => {
    const {data, error} = await supabase.from('course').select('*').eq('courseID', courseID).single();

    if (error) {
        throw new Error(`Error fetching course by ID: ${error.message}`);
    }
    return data;
}

const updateCourse = async (courseID, updates) => {
    const {data, error} = await supabase.from('course').update(updates).eq('courseID', courseID).select();
    if (error) {
        throw new Error(`Error updating course: ${error.message}`);
    }
    return data;
}

const deleteCourse = async (courseID) => {
    const {data, error} = await supabase.from('course').delete().eq('courseID', courseID).select();
    if (error) {
        throw new Error(`Error deleting course: ${error.message}`);
    }
    return data;
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};