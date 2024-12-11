import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config();  // Load environment variables from.env file into process.env object.  This is used to store configuration data.  This data is not directly accessible in your code.  It's stored in environment variables that your operating system can access.  This is useful for things like API keys, passwords, and secret data.

cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadDataOnCloud = async(localFilePath) =>{
    try{
        if(!localFilePath){
           return null
        }
        const cloudResponse = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        fs.unlinkSync(localFilePath)
        return cloudResponse // Sending back cloud store response
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadDataOnCloud}