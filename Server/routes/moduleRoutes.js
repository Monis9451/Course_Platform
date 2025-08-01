const express = require('express');
const verifyFirebaseToken = require('../middleware/authMiddleware');
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

router.post('/create', verifyFirebaseToken, isAdmin, createModuleHandler);
router.get('/all', getAllModulesHandler);
router.get('/:id', getModuleByIdHandler);
router.get('/course/:courseId', getModulesByCourseIdHandler);
router.put('/:id', verifyFirebaseToken, isAdmin, updateModuleHandler);
router.delete('/:id', verifyFirebaseToken, isAdmin, deleteModuleHandler);

module.exports = router;