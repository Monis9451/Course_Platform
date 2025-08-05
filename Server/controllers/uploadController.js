const { uploadOnCloudinary } = require("../config/cloudinary.js");
const { catchAsync } = require("../utils/catchAsync.js");
const { AppError } = require("../utils/appError.js");

const uploadHandler = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("File is missing.", 400));
  }
  const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

  if (!cloudinaryResponse) {
    return next(new AppError("Error uploading file to Cloudinary.", 500));
  }

  return res.status(200).json({
    message: "File uploaded successfully.",
    url: cloudinaryResponse.secure_url,
  });
});

module.exports = { uploadHandler };