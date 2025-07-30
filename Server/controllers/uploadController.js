import { uploadOnCloudinary } from "../config/cloudinary.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

const uploadHandler = catchAsync(async (req, res, next) => {
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    return next(new AppError("File is missing", 400));
  }

  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse) {
    return next(new AppError("Failed to upload file to Cloudinary", 500));
  }

  return res.status(200).json({
    status: "success",
    message: "File uploaded successfully",
    data: {
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    }
  });
});

export { uploadHandler };