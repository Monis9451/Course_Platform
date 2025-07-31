const {
    createModule,
    getAllModules,
    getModuleById,
    getModulesByCourseId,
    updateModule,
    deleteModule
} = require('../models/moduleModel.js');
const { catchAsync } = require('../utils/catchAsync.js');
const { AppError } = require('../utils/appError.js');

const createModuleHandler = catchAsync(async (req, res, next) => {
    const { courseID, title, description, order, lessonNumber } = req.body;

    if (!courseID || !title || !description || !order || !lessonNumber) {
        return next(new AppError('Missing required fields', 400));
    }

    const newModule = await createModule({  courseID, title, description, order, lessonNumber });

    return res.status(201).json({
        status: 'success',
        data: {
            module: newModule
        }
    });
});

module.exports = {
    createModuleHandler
};