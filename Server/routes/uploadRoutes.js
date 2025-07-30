import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { uploadHandler } from "../controllers/uploadController.js";
const { isAdmin } = require('../middleware/isAdminMiddleware');

const router = Router();

router.post("/upload", isAdmin, upload.single("file"), uploadHandler);

export default router;
