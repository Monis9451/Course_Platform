const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const isAdmin = catchAsync(async (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.error('ADMIN_EMAIL environment variable not set');
    return next(new AppError('Server configuration error.', 500));
  }
  
  if (req.user?.email === adminEmail) {
    next();
  } else {
    return next(new AppError('Access denied. Admin privileges required.', 403));
  }
});

module.exports = { isAdmin };