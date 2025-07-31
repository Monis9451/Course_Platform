const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { createCourseHandler } = require('../controllers/courseController.js');

const router = express.Router();

router.post('/create', isAdmin, createCourseHandler);

module.exports = router;