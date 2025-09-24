const express = require('express');
const {
    createFrontPageContentHandler,
    getFrontPageContentHandler,
    updateFrontPageContentHandler,
    deleteFrontPageContentHandler,
    getAllFrontPageContentsHandler
} = require('../controllers/frontPageContentController');
const auth = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware');

const router = express.Router();

// Public routes
router.get('/:courseId', getFrontPageContentHandler);
router.get('/', getAllFrontPageContentsHandler);

// Admin only routes
router.post('/', auth, isAdmin, createFrontPageContentHandler);
router.put('/:courseId', auth, isAdmin, updateFrontPageContentHandler);
router.delete('/:courseId', auth, isAdmin, deleteFrontPageContentHandler);

module.exports = router;