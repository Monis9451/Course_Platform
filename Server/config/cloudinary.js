const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary environment variables. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
    throw new Error('Cloudinary configuration is incomplete');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            return reject(new Error('File buffer is required'));
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: 'auto',
                timeout: 60000 // 60 seconds timeout
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary stream upload error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );
        
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
}

module.exports = { uploadOnCloudinary };