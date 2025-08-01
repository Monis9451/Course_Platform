const supabase = require('../config/supabase');

const createCourse = async (title, description, imageURL, moduleNumbers) => {
    const {data, error} = await supabase.from('course').insert([{
        title,
        description,
        imageURL,
        moduleNumbers,
        completed: false, // Add completion flag
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
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
    // Add lastModified timestamp to all updates
    const updatesWithTimestamp = {
        ...updates,
        lastModified: new Date().toISOString()
    };
    
    const {data, error} = await supabase.from('course').update(updatesWithTimestamp).eq('courseID', courseID).select();
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

const getIncompleteCourses = async () => {
    const {data, error} = await supabase.from('course').select('*').eq('completed', false);
    if (error) {
        throw new Error(`Error fetching incomplete courses: ${error.message}`);
    }
    return data;
}

const getIncompleteCoursesWithDetails = async () => {
    // Get all incomplete courses
    const {data: courses, error: coursesError} = await supabase
        .from('course')
        .select('*')
        .eq('completed', false)
        .order('lastModified', { ascending: false });
    
    if (coursesError) {
        throw new Error(`Error fetching incomplete courses: ${coursesError.message}`);
    }

    // For each course, get its modules and lessons
    const coursesWithDetails = await Promise.all(
        courses.map(async (course) => {
            // Get modules for this course
            const {data: modules, error: modulesError} = await supabase
                .from('module')
                .select('*')
                .eq('courseID', course.courseID)
                .order('order');
                
            if (modulesError) {
                console.warn(`Error fetching modules for course ${course.courseID}:`, modulesError);
                return { ...course, modules: [] };
            }

            // Get lessons for each module
            const modulesWithLessons = await Promise.all(
                modules.map(async (module) => {
                    const {data: lessons, error: lessonsError} = await supabase
                        .from('lesson')
                        .select('*')
                        .eq('moduleID', module.moduleID)
                        .order('order');
                        
                    if (lessonsError) {
                        console.warn(`Error fetching lessons for module ${module.moduleID}:`, lessonsError);
                        return { ...module, lessons: [] };
                    }
                    
                    return { ...module, lessons };
                })
            );

            return { ...course, modules: modulesWithLessons };
        })
    );

    return coursesWithDetails;
}

const markCourseAsCompleted = async (courseID) => {
    const {data, error} = await supabase.from('course').update({completed: true}).eq('courseID', courseID).select();
    if (error) {
        throw new Error(`Error marking course as completed: ${error.message}`);
    }
    return data;
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getIncompleteCourses,
    getIncompleteCoursesWithDetails,
    markCourseAsCompleted
};