import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import ApiError from "../utils/ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function fileUploader(eventName, fileName, filePaths) {
  try {
    if (!eventName) throw new Error("Error: Event Name Not Found!");
    if (!fileName) throw new Error("Error: File Name Not Found!");
    if (!filePaths.length) throw new Error("Error: File Path Not Found!");

    // Uploading Files
    //const uploadResult = await cloudinary.uploader.upload(filePaths, options);
    
    const uploadResult = [];

    for (let i=0; i<filePaths.length; i++) {
      uploadResult.push(await cloudinary.uploader.upload(filePaths[i].path, {
        public_id: fileName + `_${i}`,
        resource_type: "auto",
        asset_folder: `DT-Assignment/${eventName}`,
      }));
    }
    await filePaths.map(file => fs.unlinkSync(file.path));
    return uploadResult;
  } catch (error) {
    await filePaths.map(file => fs.unlinkSync(file.path));
    console.error("Error While Uploading File On Cloudinary!, Error: ", error);
    throw new ApiError(500, "Error While Uploading File!", error);
  }
}

async function fileDeleter(
  imageUrls,
  filePaths
) {
  try {
    const imageFilesNames = await imageUrls.map(url => url.split("/").pop().split(".")[0].split("%20").join(" "));
    console.log(imageFilesNames);
    const deletedImages = await cloudinary.api.delete_resources(imageFilesNames, {
      type: "upload",
      resource_type: "image",
    });
    return deletedImages;
  } catch (error) {
    await filePaths.map(file => fs.unlinkSync(file.path));
    console.error("Error While Deleting File: ", error);
  }
}

export { fileUploader, fileDeleter };