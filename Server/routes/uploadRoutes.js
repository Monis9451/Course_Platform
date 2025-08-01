const express = require('express');
const upload = require('../middleware/multer.js');
const { uploadHandler } = require('../controllers/uploadController.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const verifyFirebaseToken = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post("/cloudinary", verifyFirebaseToken, isAdmin, upload.single("file"), uploadHandler);

module.exports = router;
