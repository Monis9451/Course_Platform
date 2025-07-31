import { Router } from 'express';
import { createModuleHandler } from '../controllers/moduleController.js';
import { isAdmin } from '../middleware/isAdminMiddleware.js';


const router = Router();

router.post('/create', isAdmin, createModuleHandler);

export default router;