import {
    createModule,
    getAllModules,
    getModuleById,
    getModulesByCourseId,
    updateModule,
    deleteModule
} from '../models/moduleModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const createModuleHandler = catchAsync(async (req, res, next) => {
    const { courseID, title, description, order } = req.body;

    if (!courseID || !title || !description || !order) {
        return next(new AppError('Missing required fields', 400));
    }

    const newModule = await createModule({  courseID, title, description, order });

    return res.status(201).json({
        status: 'success',
        data: {
            module: newModule
        }
    });
});