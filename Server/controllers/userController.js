const { createUser,
        getAllUsers,
        getUserById, 
        getUserByEmail, 
        updateUser, 
        deleteUser } = require('../models/userModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

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

    const userData = await getUserById(user.uid);
    
    if (!userData) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'User authenticated', 
        data: { userData }
    });
});

const registerUserHandler = catchAsync(async (req, res, next) => {
    const user = req.user;
    const { uid, displayName, email } = req.body;
    
    if (!user) {
        return next(new AppError('User not authenticated', 401));
    }
    
    console.log('Registering user:', {
        firebaseUser: {
            uid: user.uid,
            email: user.email
        },
        requestBody: {
            uid,
            displayName,
            email
        }
    });
    
    // Use Firebase user's UID as the primary identifier
    const userID = user.uid;
    
    let userData = await getUserById(userID);
    
    if (!userData) {
        console.log('User not found in database, creating new user');
        // Create user if they don't exist
        const newUserData = await createUser({
            userID: userID,
            username: displayName || user.name || email?.split('@')[0] || 'User',
            email: email || user.email
        });
        userData = Array.isArray(newUserData) ? newUserData[0] : newUserData;
    }
    
    res.status(200).json({
        status: 'success',
        message: 'User authenticated successfully', 
        data: { userData }
    });
});

const getUserByEmailHandler = catchAsync(async (req, res, next) => {
    const { email } = req.params;
    
    if (!email) {
        return next(new AppError('Email parameter is required', 400));
    }

    const user = await getUserByEmail(email);
    
    if (!user) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({ 
        status: 'success',
        data: { user }
    });
});

const createUserHandler = catchAsync(async (req, res, next) => {
    const { userID, username, email } = req.body;
    
    if (!userID || !username || !email) {
        return next(new AppError('UserID, username, and email are required', 400));
    }

    const existingUser = await getUserById(userID);
    if (existingUser) {
        return res.status(200).json({ 
            status: 'success',
            message: 'User already exists', 
            data: { user: existingUser }
        });
    }

    const newUserData = await createUser({ userID, username, email });
    const newUser = Array.isArray(newUserData) ? newUserData[0] : newUserData;
    
    res.status(201).json({ 
        status: 'success',
        message: 'User created successfully', 
        data: { user: newUser }
    });
});

const getAllUsersHandler = catchAsync(async (req, res, next) => {
    try {
        const users = await getAllUsers();
        
        // Check if users is null, undefined, or not an array
        if (!users || !Array.isArray(users)) {
            return next(new AppError('Failed to fetch users - invalid data', 500));
        }
        
        res.status(200).json({ 
            status: 'success',
            results: users.length,
            data: { users }
        });
    } catch (error) {
        console.error('Error in getAllUsersHandler:', error);
        return next(new AppError(`Failed to fetch users: ${error.message}`, 500));
    }
});

const updateUserHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!id) {
        return next(new AppError('User ID is required', 400));
    }

    if (!username && !email) {
        return next(new AppError('At least one field (username or email) is required for update', 400));
    }

    const updatedUser = await updateUser(id, { username, email });
    
    if (!updatedUser) {
        return next(new AppError('User not found', 404));
    }

    res.status(200).json({ 
        status: 'success',
        message: 'User updated successfully', 
        data: { user: updatedUser }
    });
});

const deleteUserHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        return next(new AppError('User ID is required', 400));
    }

    const deletedUser = await deleteUser(id);
    
    if (!deletedUser) {
        return next(new AppError('User not found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    adminDashboardHandler,
    adminCheckHandler,
    getUserProfile,
    registerUserHandler,
    getUserByEmailHandler,
    createUserHandler,
    getAllUsersHandler,
    updateUserHandler,
    deleteUserHandler
};