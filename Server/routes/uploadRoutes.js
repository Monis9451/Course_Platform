const express = require('express');
const upload = require('../middleware/multer.js');
const { uploadHandler } = require('../controllers/uploadController.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');

const router = express.Router();

router.post("/cloudinary", isAdmin, upload.single("file"), uploadHandler);

module.exports = router;
