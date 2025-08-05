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
        'application/pdf'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
        files: 1
    }
});

module.exports = upload;