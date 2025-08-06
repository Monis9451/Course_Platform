const express = require('express');
const verifySupabaseToken = require('../middleware/authMiddleware');
const { 
    createModuleHandler,
    getAllModulesHandler,
    getModuleByIdHandler,
    getModulesByCourseIdHandler,
    updateModuleHandler,
    deleteModuleHandler
} = require('../controllers/moduleController.js');
const { isAdmin } = require('../middleware/isAdminMiddleware.js');

const router = express.Router();

router.post('/create', verifySupabaseToken, isAdmin, createModuleHandler);
router.get('/all', getAllModulesHandler);
router.get('/:id', getModuleByIdHandler);
router.get('/course/:courseId', getModulesByCourseIdHandler);
router.put('/:id', verifySupabaseToken, isAdmin, updateModuleHandler);
router.delete('/:id', verifySupabaseToken, isAdmin, deleteModuleHandler);

module.exports = router;