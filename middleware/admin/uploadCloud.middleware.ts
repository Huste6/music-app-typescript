// Import necessary modules and initialize Cloudinary configuration
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Connect to Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Function to upload to Cloudinary
const streamUpload = (buffer: any) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const uploadToCloudinary = async (buffer: any) => {
    let result = await streamUpload(buffer);
    return result["secure_url"];
}

// Middleware to handle file upload
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req["file"]) {
            const result = await uploadToCloudinary(req["file"].buffer);
            req.body[req["file"].fieldname] = result;
        } else {
            console.error('No file received in the request');
            res.status(400).send({ error: 'No file received' });
            return;
        }
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send({ error: 'Failed to upload to Cloudinary' });
        return;
    }
    next();
}
