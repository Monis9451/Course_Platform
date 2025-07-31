import {Router} from 'express';
import { isAdmin } from '../middleware/isAdminMiddleware.js';
import { createLessonWithoutContent, addingContentToLesson } from '../controllers/lessonController.js';

const router = Router();

router.post('/without-content', isAdmin, createLessonWithoutContent);
router.post('/add-content', isAdmin, addingContentToLesson);

export default router;