const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const supabase = require('../config/supabase');
const { getEnrollmentsByUserId } = require('../models/enrollmentModel');
const { getCourseById } = require('../models/courseModel');

const adminDashboardHandler = catchAsync(async (req, res, next) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Welcome to the admin dashboard',
        user: req.user 
    });
});

const adminCheckHandler = catchAsync(async (req, res, next) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
        return next(new AppError('Server configuration error: Admin email not set', 500));
    }
    
    const userEmail = req.user?.email;
    
    if (!userEmail) {
        return next(new AppError('User email not found in token', 400));
    }
    
    const isAdminUser = userEmail === adminEmail;
    
    res.status(200).json({
        status: 'success',
        isAdmin: isAdminUser,
        email: userEmail,
        message: isAdminUser ? 'Admin access confirmed' : 'Regular user access'
    });
});

const getUserProfile = catchAsync(async (req, res, next) => {
    const user = req.user;
    
    if (!user) {
        return next(new AppError('User not authenticated', 401));
    }

    res.status(200).json({
        status: 'success',
        message: 'User authenticated', 
        data: { user }
    });
});

const getAllUsersHandler = catchAsync(async (req, res, next) => {
    try {
        const { data: { users }, error } = await supabase.auth.admin.listUsers();
        
        if (error) {
            return next(new AppError('Failed to fetch users', 500));
        }

        res.status(200).json({
            status: 'success',
            data: { 
                users: users.map(user => ({
                    id: user.id,
                    email: user.email,
                    created_at: user.created_at,
                    email_confirmed_at: user.email_confirmed_at,
                    user_metadata: user.user_metadata
                }))
            }
        });
    } catch (error) {
        return next(new AppError('Server error while fetching users', 500));
    }
});

const getUserByEmailHandler = catchAsync(async (req, res, next) => {
    const { email } = req.params;
    
    if (!email) {
        return next(new AppError('Email parameter is required', 400));
    }

    try {
        const { data: user, error } = await supabase.auth.admin.getUserByEmail(email);
        
        if (error || !user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { 
                exists: true,
                user: {
                    id: user.id,
                    email: user.email,
                    created_at: user.created_at
                }
            }
        });
    } catch (error) {
        return next(new AppError('Error checking user existence', 500));
    }
});

const getUserCoursesHandler = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    
    if (!userId) {
        return next(new AppError('User not authenticated', 401));
    }

    try {
        // Get user's enrollments
        const enrollments = await getEnrollmentsByUserId(userId);
        
        if (!enrollments || enrollments.length === 0) {
            return res.status(200).json({
                status: 'success',
                data: { courses: [] },
                message: 'No enrolled courses found'
            });
        }

        // Get course details for each enrollment
        const coursePromises = enrollments.map(enrollment => 
            getCourseById(enrollment.courseID)
        );
        
        const courses = await Promise.all(coursePromises);
        
        // Combine course data with enrollment info
        const userCourses = courses.map((course, index) => ({
            ...course,
            enrollmentProgress: enrollments[index].progress,
            enrolledAt: enrollments[index].created_at
        }));

        res.status(200).json({
            status: 'success',
            data: { courses: userCourses },
            message: 'User courses fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        return next(new AppError('Failed to fetch user courses', 500));
    }
});

module.exports = {
    adminDashboardHandler,
    adminCheckHandler,
    getUserProfile,
    getUserByEmailHandler,
    getAllUsersHandler,
    getUserCoursesHandler
};