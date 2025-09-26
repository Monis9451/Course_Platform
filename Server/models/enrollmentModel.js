const supabase = require('../config/supabase');

const createEnrollment = async (userID, courseID, progress) => {
    console.log('=== CREATING ENROLLMENT ===');
    console.log('Creating enrollment for userID:', userID);
    console.log('Creating enrollment for courseID:', courseID);
    console.log('Progress:', progress);
    
    // Ensure courseID is a number for consistency
    const numericCourseID = parseInt(courseID);
    console.log('Converted courseID for enrollment:', numericCourseID);
    
    const {data, error} = await supabase.from('enrollment').insert([{
        userID,
        courseID: numericCourseID,
        progress
    }]);
    
    console.log('Enrollment creation result:', { data, error });
    
    if (error) {
        console.error('Enrollment creation error:', error);
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
    console.log('=== ENROLLMENT CHECK ===');
    console.log('Checking enrollment for userID:', userID);
    console.log('Checking enrollment for courseID:', courseID);
    console.log('UserID type:', typeof userID);
    console.log('CourseID type:', typeof courseID);
    
    // Ensure courseID is a number for consistency
    const numericCourseID = parseInt(courseID);
    console.log('Converted courseID:', numericCourseID);
    
    const {data, error} = await supabase
        .from('enrollment')
        .select('enrollmentID, userID, courseID')
        .eq('userID', userID)  // userID should remain as UUID string
        .eq('courseID', numericCourseID)  // courseID should be number
        .single();
    
    console.log('Enrollment query result:', { data, error });
    console.log('Error details:', error);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Enrollment query error:', error);
        throw new Error(`Error checking course access: ${error.message}`);
    }
    
    const hasAccess = !!data;
    console.log('Final access result:', hasAccess);
    return hasAccess; // Returns true if enrollment exists, false otherwise
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