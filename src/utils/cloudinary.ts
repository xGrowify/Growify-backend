import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (localfilepath: any) => {
  try {
    if (!localfilepath) {
      return;
      console.log("cloudinary local file path not found");
    }

    const response = cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    console.log("File upload successfully", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath); //remove local save file
  }
};

export { uploadoncloudinary };
