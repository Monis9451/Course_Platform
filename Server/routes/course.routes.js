const express = require('express');
const verifySupabaseToken = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { 
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  getCourseWithDetailsHandler,
  updateCourseHandler,
  deleteCourseHandler,
  getIncompleteCoursesHandler,
  getIncompleteCoursesWithDetailsHandler,
  markCourseAsCompletedHandler
} = require('../controllers/courseController.js');

const router = express.Router();

router.post('/create', verifySupabaseToken, isAdmin, createCourseHandler);
router.get('/all', getAllCoursesHandler);
router.get('/incomplete', verifySupabaseToken, isAdmin, getIncompleteCoursesHandler);
router.get('/incomplete/details', verifySupabaseToken, isAdmin, getIncompleteCoursesWithDetailsHandler);
router.delete('/cascade-delete/:id', verifySupabaseToken, isAdmin, deleteCourseHandler);
router.get('/:id', getCourseByIdHandler);
router.get('/:id/details', verifySupabaseToken, isAdmin, getCourseWithDetailsHandler);
router.put('/:id', verifySupabaseToken, isAdmin, updateCourseHandler);
router.put('/:id/complete', verifySupabaseToken, isAdmin, markCourseAsCompletedHandler);

module.exports = router;