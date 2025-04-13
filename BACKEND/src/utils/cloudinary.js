import { v2 as cloudinary } from 'cloudinary';
import exp from 'constants';
import fs from "fs";

// Configuration means setting up something with the necessary details so that it works properly.
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
/*
    This configures (sets up) Cloudinary with your account details (cloud name, API key, and secret).
    Without this configuration, Cloudinary won’t know which account to use when uploading files.
*/

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // File has been uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);
        // console.log(response);
        
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }