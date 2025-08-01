const { uploadOnCloudinary } = require("../config/cloudinary.js");
const { catchAsync } = require("../utils/catchAsync.js");
const { AppError } = require("../utils/appError.js");

const uploadHandler = catchAsync(async (req, res, next) => {
  console.log("Upload request received:", {
    file: req.file ? { 
      originalname: req.file.originalname, 
      size: req.file.size, 
      mimetype: req.file.mimetype,
      path: req.file.path 
    } : null,
    user: req.user?.email
  });

  const localFilePath = req.file?.path;

  if (!localFilePath) {
    console.error("No file found in request");
    return next(new AppError("File is missing", 400));
  }

  console.log("Attempting to upload file to Cloudinary:", localFilePath);
  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse) {
    console.error("Cloudinary upload failed - no response");
    return next(new AppError("Failed to upload file to Cloudinary", 500));
  }

  console.log("File uploaded successfully to Cloudinary:", cloudinaryResponse.secure_url);

  return res.status(200).json({
    status: "success",
    message: "File uploaded successfully",
    data: {
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    }
  });
});

module.exports = { uploadHandler };