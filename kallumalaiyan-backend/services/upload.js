const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

async function uploadToCloudinary(fileBuffer, filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "kallumalaiyan-sketchart" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(fileBuffer);
  });
}

module.exports = { upload, uploadToCloudinary };
