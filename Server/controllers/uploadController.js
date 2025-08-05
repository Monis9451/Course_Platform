const { uploadOnCloudinary } = require("../config/cloudinary.js");
const { catchAsync } = require("../utils/catchAsync.js");
const { AppError } = require("../utils/appError.js");

const uploadHandler = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("File is missing.", 400));
  }

  if (!req.file.buffer) {
    return next(new AppError("File buffer is missing.", 400));
  }

  try {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      return next(new AppError("Error uploading file to Cloudinary.", 500));
    }

    return res.status(200).json({
      message: "File uploaded successfully.",
      url: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id
    });
  } catch (uploadError) {
    console.error("Cloudinary upload error:", uploadError);
    return next(new AppError("Failed to upload file to cloud storage.", 500));
  }
});

module.exports = { uploadHandler };