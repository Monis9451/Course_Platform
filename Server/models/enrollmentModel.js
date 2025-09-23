const supabase = require('../config/supabase');

const createEnrollment = async (userID, courseID, progress) => {
    const {data, error} = await supabase.from('enrollment').insert([{
        userID,
        courseID,
        progress
    }]);
    if (error) {
        throw new Error(`Error creating enrollment: ${error.message}`);
    }
    return data;
}

const getAllEnrollments = async () => {
    const {data, error} = await supabase.from('enrollment').select('*');
    if (error) {
        throw new Error(`Error fetching all enrollments: ${error.message}`);
    }
    return data;
}

const getEnrollmentById = async (enrollmentID) => {
    const {data, error} = await supabase.from('enrollment').select('*').eq('enrollmentID', enrollmentID).single();
    if (error) {
        throw new Error(`Error fetching enrollment by ID: ${error.message}`);
    }
    return data;
}

const getEnrollmentsByUserId = async (userID) => {
    const {data, error} = await supabase.from('enrollment').select('*').eq('userID', userID);
    if (error) {
        throw new Error(`Error fetching enrollments by user ID: ${error.message}`);
    }
    return data;
}

const getEnrollmentsByCourseId = async (courseID) => {
    const {data, error} = await supabase.from('enrollment').select('*').eq('courseID', courseID);
    if (error) {
        throw new Error(`Error fetching enrollments by course ID: ${error.message}`);
    }
    return data;
}

const deleteEnrollment = async (enrollmentID) => {
    const {data, error} = await supabase.from('enrollment').delete().eq('enrollmentID', enrollmentID);
    if (error) {
        throw new Error(`Error deleting enrollment: ${error.message}`);
    }
    return data;
}

const updateEnrollment = async (enrollmentID, updates) => {
    const {data, error} = await supabase.from('enrollment').update(updates).eq('enrollmentID', enrollmentID);
    if (error) {
        throw new Error(`Error updating enrollment: ${error.message}`);
    }
    return data;
}

const checkUserCourseAccess = async (userID, courseID) => {
    const {data, error} = await supabase
        .from('enrollment')
        .select('enrollmentID')
        .eq('userID', userID)
        .eq('courseID', courseID)
        .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw new Error(`Error checking course access: ${error.message}`);
    }
    
    return !!data; // Returns true if enrollment exists, false otherwise
}

module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    getEnrollmentsByUserId,
    getEnrollmentsByCourseId,
    deleteEnrollment,
    updateEnrollment,
    checkUserCourseAccess
};