import { Image } from "../models/imageModel.js"
import { v2 as cloudinary } from 'cloudinary';

export const saveImage = async (req, res) => {
    try {

        console.log(req.body);
        const myCloud = await cloudinary.uploader.upload(req.body.imageData, {
            folder: 'quickcompress',
        });



        const image = await Image.create({
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            user: req.user
        });

        const allImages = await Image.find({
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            image: image,
            allImages,
            message: "Image uploaded successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Cannot upload image"
        })
    }
}
export const getAllImages = async (req, res) => {
    try {

        const images = await Image.find({
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            images,
            message: "Image uploaded successfully"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot upload image"
        })
    }
}