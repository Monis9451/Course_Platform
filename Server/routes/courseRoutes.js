const express = require('express');
const verifyFirebaseToken = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { 
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler,
  getIncompleteCoursesHandler,
  getIncompleteCoursesWithDetailsHandler,
  markCourseAsCompletedHandler
} = require('../controllers/courseController');

const router = express.Router();

router.post('/create', verifyFirebaseToken, isAdmin, createCourseHandler);
router.get('/all', getAllCoursesHandler);
router.get('/incomplete', verifyFirebaseToken, isAdmin, getIncompleteCoursesHandler);
router.get('/incomplete/details', verifyFirebaseToken, isAdmin, getIncompleteCoursesWithDetailsHandler);
router.get('/:id', getCourseByIdHandler);
router.put('/:id', verifyFirebaseToken, isAdmin, updateCourseHandler);
router.put('/:id/complete', verifyFirebaseToken, isAdmin, markCourseAsCompletedHandler);
router.delete('/:id', verifyFirebaseToken, isAdmin, deleteCourseHandler);

module.exports = router;