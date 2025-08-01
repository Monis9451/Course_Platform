const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        
        // Clean up the local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return response;
    }
    catch(error){
        console.error("Error uploading to Cloudinary:", error);
        
        // Clean up the local file even if upload fails
        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
            } catch (unlinkError) {
                console.error("Error cleaning up local file:", unlinkError);
            }
        }
        
        throw error;
    }
}

module.exports = { uploadOnCloudinary };