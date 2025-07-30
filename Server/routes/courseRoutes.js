import { Router } from 'express';
const { isAdmin } = require('../middleware/isAdminMiddleware');
import { createCourseHandler } from '../controllers/courseController.js';

const router = Router();

router.post('/create', isAdmin, createCourseHandler);

export default router;