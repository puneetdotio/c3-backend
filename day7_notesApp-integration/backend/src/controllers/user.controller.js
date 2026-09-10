const imagekit = require("../config/imagekit.config")

const createController = async (req, res) => {
    try {
        const file = req.file;

        const uploadedFile = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "uploads",
        })

        res.status(201).json({
            message: "file uploaded successfully",
            imageUrl: uploadedFile.url,
        })
        
    } catch (error) {
        console.log("error while uploading the image file", error)
    }
}

module.exports = { createController }