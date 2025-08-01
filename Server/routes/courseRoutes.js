const express = require('express');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');
const { 
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler
} = require('../controllers/courseController.js');

const router = express.Router();
console.log("Course routes loaded");
router.post('/create', isAdmin, createCourseHandler);
router.get('/all', getAllCoursesHandler);
router.get('/:id', getCourseByIdHandler);
router.put('/:id', isAdmin, updateCourseHandler);
router.delete('/:id', isAdmin, deleteCourseHandler);

module.exports = router;