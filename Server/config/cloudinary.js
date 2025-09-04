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

const uploadOnCloudinary = async (fileBuffer, originalName = '') => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) {
            return reject(new Error('File buffer is required'));
        }

        // Determine resource type based on file extension or MIME type
        let resourceType = 'auto';
        const fileName = originalName.toLowerCase();
        
        if (fileName.includes('.mp3') || fileName.includes('.wav') || fileName.includes('.m4a') || 
            fileName.includes('.aac') || fileName.includes('.ogg') || fileName.includes('.flac')) {
            resourceType = 'video'; // Cloudinary uses 'video' for audio files
        }

        console.log(`Uploading file: ${originalName}, Resource type: ${resourceType}`);

        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: resourceType,
                timeout: 120000, // 2 minutes timeout for audio files
                chunk_size: 6000000, // 6MB chunks for better upload reliability
                use_filename: true,
                unique_filename: true,
                folder: 'course_content' // organize uploads in folders
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary stream upload error:", error);
                    return reject(error);
                }
                console.log("Cloudinary upload successful:", result.secure_url);
                resolve(result);
            }
        );
        
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
}

module.exports = { uploadOnCloudinary };