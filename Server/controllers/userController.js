const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const supabase = require('../config/supabase');

const adminDashboardHandler = catchAsync(async (req, res, next) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Welcome to the admin dashboard',
        user: req.user 
    });
});

const adminCheckHandler = catchAsync(async (req, res, next) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdminUser = req.user?.email === adminEmail;
    
    res.status(200).json({
        status: 'success',
        isAdmin: isAdminUser,
        email: req.user?.email
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

// Get all users from Supabase auth (admin only)
const getAllUsersHandler = catchAsync(async (req, res, next) => {
    try {
        // Using Supabase Admin SDK to list users
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

// Get user by email from Supabase auth (for checking existence)
const getUserByEmailHandler = catchAsync(async (req, res, next) => {
    const { email } = req.params;
    
    if (!email) {
        return next(new AppError('Email parameter is required', 400));
    }

    try {
        // Using Supabase Admin SDK to get user by email
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

module.exports = {
    adminDashboardHandler,
    adminCheckHandler,
    getUserProfile,
    getUserByEmailHandler,
    getAllUsersHandler
};