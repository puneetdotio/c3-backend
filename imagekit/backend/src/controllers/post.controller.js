const postModel = require("../models/post.model")
const sendFiles = require("../services/storage.service")

const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;
        const file = req.file;

        if (!file || !caption) return res.status(400).json({
            success: false,
            message: "fields are required",
        })

        const uploadImage = await sendFiles(file.buffer, file.originalname)

        const post = await postModel.create({
            caption,
            image: uploadImage.url,
        })

        return res.status(201).json({
            success: true,
            message: "post created successfully",
            post,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllPostController = async (req, res) => {
    try {
        const posts = await postModel.find();

        return res.status(200).json({
            success: true,
            message: "all posts fetched successfully",
            posts,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    createPostController,
    getAllPostController,
}