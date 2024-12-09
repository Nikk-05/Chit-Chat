import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
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
        fs.unlinksync(localFilePath)
        return null;
    }
}

export {uploadDataOnCloud}