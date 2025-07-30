import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const router = Router();

router.post("/cloudinary", upload.single("file"), async (req, res) => {
  try {
    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: "File is missing" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res
        .status(500)
        .json({ message: "Failed to upload file to Cloudinary" });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

export default router;
