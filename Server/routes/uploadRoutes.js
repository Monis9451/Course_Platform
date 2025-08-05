const express = require('express');
const upload = require('../middleware/multer.js');
const { uploadHandler } = require('../controllers/uploadController.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const verifyFirebaseToken = require('../middleware/authMiddleware.js');
const { AppError } = require('../utils/appError.js');

const router = express.Router();

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof Error) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File size too large. Maximum size is 50MB.', 400));
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(new AppError('Too many files. Only one file is allowed.', 400));
    }
    if (err.message.includes('File type') && err.message.includes('not allowed')) {
      return next(new AppError('Invalid file type. Only images, videos, audio files, and PDFs are allowed.', 400));
    }
    return next(new AppError(err.message, 400));
  }
  next(err);
};

router.post("/cloudinary", verifyFirebaseToken, isAdmin, upload.single("file"), handleMulterError, uploadHandler);

module.exports = router;
