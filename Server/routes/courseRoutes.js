const express = require('express');
const verifyFirebaseToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { 
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler
} = require('../controllers/courseController.js');

const router = express.Router();
router.post('/create', verifyFirebaseToken, isAdmin, createCourseHandler);
router.get('/all', getAllCoursesHandler);
router.get('/:id', getCourseByIdHandler);
router.put('/:id', verifyFirebaseToken, isAdmin, updateCourseHandler);
router.delete('/:id', verifyFirebaseToken, isAdmin, deleteCourseHandler);

module.exports = router;