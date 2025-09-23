const supabase = require("../config/supabase");
const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const verifySupabaseToken = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Authorization token is required", 401));
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    console.error("Token verification error:", error.message);
    return next(new AppError(error.message, 401));
  }

  if (!user) {
    return next(new AppError("Invalid or expired token", 401));
  }

  // Check if user is admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = user.email === adminEmail;

  req.user = { ...user, isAdmin };
  next();
});

module.exports = verifySupabaseToken;
