import {v2 as cloudinary} from 'cloudinary'
import { response } from "express";
import fs from "fs"
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
cloudinary.config({
    cloud_name : "dn4xqjx6u",
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});
// upload file -> make it an async function because - time lagta h
// console.log(cloudinary.config());

const uploadFile = async(localFilePath) => {
    try {
        // console.log("API Key:", process.env.CLOUDINARY_API);
        // console.log("API Secret:", process.env.CLOUDINARY_SECRET);
        
        if(!localFilePath){
            console.log('hi');    
            return null
        }
        // file upload on cloudinary
        const uploaded = await cloudinary.uploader
        .upload(localFilePath, {
            resource_type: "auto"  // png, jpg, pdf,.. etc 
        })
        console.log(localFilePath);
        console.log("Successfully uploaded file on cloudinary", uploaded);
        console.log("Successfully uploaded file on cloudinary with URL:", uploaded.url);
        fs.unlinkSync(localFilePath)
        return uploaded
    } 
    catch (error) {

        // Here comes the case that file if on the server but not uploaded on cloudinary so we should ask user to upload file again, but there since it's on server this will create many malicious files on the server, which is not good
        // fs.unlink() -> this asyncronously unlinks file, but we want that the file should unlink first then, proceeds, so use unlinkSync(), instead.
        console.error('Error during Cloudinary upload:', error.message || error);
        // fs.unlinkSync(localFilePath); // remove the locally saved temp file as upload got failed.
        return null
    }
}

export {uploadFile};