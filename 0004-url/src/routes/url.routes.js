import { Router } from "express";
import generateCode from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = Router();

/* post : /api/url */
router.post("/", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            error: "Please enter valid url",
        })
    }

    if ((url.startsWith("http://") == false) && (url.startsWith("https://") == false)) {
        return res.status(400).json({
            error: "Please enter a valid url starting with http:// or https://",
        })
    }

    if (url.length > 2048) {
        return res.json({
            error: "URL is too long",
        })
    }

    const code = generateCode();

    const newUrl = await urlModel.create({
        originalUrl: url,
        shortCode: code,
    })

    return res.status(201).json({
        message: "url shortned successfully",
        data: {
            originalUrl: newUrl.originalUrl,
            shortcode: newUrl.shortCode,
        }
    })
})

/* get :  */
router.get("/", async (req, res) => {
    const urls = await urlModel.find();

    return res.status(200).json({
        message: "URLs fetched successfully",
        data: {
            urls
        }
    })
})

export default router;