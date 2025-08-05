const { uploadOnCloudinary } = require("../config/cloudinary.js");
const { catchAsync } = require("../utils/catchAsync.js");
const { AppError } = require("../utils/appError.js");

const uploadHandler = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is missing." });
  }
  const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

  if (!cloudinaryResponse) {
    return res.status(500).json({ message: "Error uploading file." });
  }

  return res.status(200).json({
    message: "File uploaded successfully.",
    url: cloudinaryResponse.secure_url,
  });
});

module.exports = { uploadHandler };