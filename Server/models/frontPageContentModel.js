const supabase = require('../config/supabase');

// Create front page course content
const createFrontPageContent = async (courseID, frontPageData) => {
    const {data, error} = await supabase.from('front_page_course_content').insert([{
        course_id: courseID,  // Map courseID to course_id column
        ...frontPageData
    }]).select();

    if (error) {
        throw new Error(`Error creating front page content: ${error.message}`);
    }
    return data;
}

// Get front page content by course ID
const getFrontPageContentByCourseId = async (courseID) => {
    const {data, error} = await supabase
        .from('front_page_course_content')
        .select('*')
        .eq('course_id', courseID)  // Use course_id column name
        .single();

    if (error) {
        throw new Error(`Error fetching front page content: ${error.message}`);
    }
    return data;
}

// Update front page content
const updateFrontPageContent = async (courseID, updates) => {
    const {data, error} = await supabase
        .from('front_page_course_content')
        .update(updates)
        .eq('course_id', courseID)  // Use course_id column name
        .select();

    if (error) {
        throw new Error(`Error updating front page content: ${error.message}`);
    }
    return data;
}

// Delete front page content
const deleteFrontPageContent = async (courseID) => {
    const {data, error} = await supabase
        .from('front_page_course_content')
        .delete()
        .eq('course_id', courseID)  // Use course_id column name
        .select();

    if (error) {
        throw new Error(`Error deleting front page content: ${error.message}`);
    }
    return data;
}

// Get all front page contents
const getAllFrontPageContents = async () => {
    const {data, error} = await supabase
        .from('front_page_course_content')
        .select('*');

    if (error) {
        throw new Error(`Error fetching all front page contents: ${error.message}`);
    }
    return data;
}

module.exports = {
    createFrontPageContent,
    getFrontPageContentByCourseId,
    updateFrontPageContent,
    deleteFrontPageContent,
    getAllFrontPageContents
};