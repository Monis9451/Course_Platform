const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const {
    createFrontPageContent,
    getFrontPageContentByCourseId,
    updateFrontPageContent,
    deleteFrontPageContent,
    getAllFrontPageContents
} = require('../models/frontPageContentModel');

// Create front page content
const createFrontPageContentHandler = catchAsync(async (req, res, next) => {
    const { 
        courseID,
        frontPageDescription,
        price,
        whatYouWillGain,
        courseDetails,
        whyThisCourse,
        testimonials,
        instructorInfo,
        duration,
        courseType,
        modules
    } = req.body;

    if (!courseID) {
        return next(new AppError('Course ID is required', 400));
    }

    const frontPageData = {
        front_page_description: frontPageDescription || '',
        price: parseFloat(price) || 0,
        pricing_details: {
            currency: 'GBP',
            courseDetails: courseDetails || {}
        },
        testimonials: Array.isArray(testimonials) ? testimonials : [],
        benefits: Array.isArray(whatYouWillGain) ? whatYouWillGain : [],
        instructor_info: instructorInfo || {},
        duration: duration || null,
        course_type: courseType || null,
        why_this_course: Array.isArray(whyThisCourse) ? whyThisCourse : []
    };

    const result = await createFrontPageContent(courseID, frontPageData);

    res.status(201).json({
        status: 'success',
        message: 'Front page content created successfully',
        data: { frontPageContent: result[0] }
    });
});

// Get front page content by course ID
const getFrontPageContentHandler = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    const frontPageContent = await getFrontPageContentByCourseId(courseId);

    res.status(200).json({
        status: 'success',
        data: { frontPageContent }
    });
});

// Update front page content
const updateFrontPageContentHandler = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    const {
        frontPageDescription,
        price,
        currency,
        courseDetails,
        testimonials,
        benefits,
        instructorInfo,
        duration,
        courseType,
        whyThisCourse
    } = req.body;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    const updates = {};

    // Handle pricing details
    if (frontPageDescription !== undefined || price !== undefined || currency !== undefined || courseDetails !== undefined) {
        const currentContent = await getFrontPageContentByCourseId(courseId).catch(() => null);
        const currentPricing = currentContent?.pricing_details || {};
        
        updates.pricing_details = {
            ...currentPricing,
            ...(frontPageDescription !== undefined && { frontPageDescription }),
            ...(price !== undefined && { price: parseFloat(price) }),
            ...(currency !== undefined && { currency }),
            ...(courseDetails !== undefined && { courseDetails })
        };
    }

    // Handle array fields
    if (testimonials !== undefined) {
        updates.testimonials = Array.isArray(testimonials) ? testimonials : [];
    }
    if (benefits !== undefined) {
        updates.benefits = Array.isArray(benefits) ? benefits : [];
    }
    if (whyThisCourse !== undefined) {
        updates.why_this_course = Array.isArray(whyThisCourse) ? whyThisCourse : [];
    }

    // Handle other fields
    if (instructorInfo !== undefined) {
        updates.instructor_info = instructorInfo || {};
    }
    if (duration !== undefined) {
        updates.duration = duration;
    }
    if (courseType !== undefined) {
        updates.course_type = courseType;
    }

    const result = await updateFrontPageContent(courseId, updates);

    if (!result || result.length === 0) {
        return next(new AppError('Front page content not found', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Front page content updated successfully',
        data: { frontPageContent: result[0] }
    });
});

// Delete front page content
const deleteFrontPageContentHandler = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    const result = await deleteFrontPageContent(courseId);

    if (!result.length) {
        return next(new AppError('No front page content found for this course', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Front page content deleted successfully'
    });
});

// Get all front page contents
const getAllFrontPageContentsHandler = catchAsync(async (req, res, next) => {
    const frontPageContents = await getAllFrontPageContents();

    res.status(200).json({
        status: 'success',
        data: { frontPageContents }
    });
});

module.exports = {
    createFrontPageContentHandler,
    getFrontPageContentHandler,
    updateFrontPageContentHandler,
    deleteFrontPageContentHandler,
    getAllFrontPageContentsHandler
};