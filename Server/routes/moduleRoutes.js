const express = require('express');
const { createModuleHandler } = require('../controllers/moduleController.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');

const router = express.Router();

router.post('/create', isAdmin, createModuleHandler);

module.exports = router;