import { Image } from "../models/imageModel.js"

export const saveImage = async (req, res) => {
    try {

        const myCloud = await cloudinary.uploader.upload(req.body.imageData, {
            folder: 'quickcompress',
        });

        const image = await Image.create({
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            user: req.user
        });

        res.status(200).json({
            success: true,
            image: image,
            message: "Image uploaded successfully"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot upload image"
        })
    }
}