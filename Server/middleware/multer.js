const multer = require('multer');

const storage = multer.memoryStorage();

// File filter for security and validation
const fileFilter = (req, file, cb) => {
    // Allow images, videos, and audio files
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'audio/mpeg',
        'audio/wav',
        'audio/mp3',
        'audio/mp4',
        'audio/x-wav',
        'audio/x-mpeg',
        'audio/webm',
        'audio/ogg',
        'audio/aac',
        'audio/flac',
        'application/pdf'
    ];

    console.log(`File upload attempt: ${file.originalname}, MIME type: ${file.mimetype}`);

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.error(`Rejected file type: ${file.mimetype} for file: ${file.originalname}`);
        cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for audio files
        files: 1
    }
});

module.exports = upload;