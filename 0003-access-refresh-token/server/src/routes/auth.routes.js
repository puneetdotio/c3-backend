import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";

const router = Router();

/* post : /api/auth/register */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUserExists = await userModel.findOne({ email })

        if (isUserExists) {
            return res.status(401).json({
                success: false,
                message: "user already exists",
                error: [
                    {
                        path: "email",
                        message: "user already exists",
                    }
                ]
            })
        }

        const user = await userModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 12),
        })

        const { accessToken, refreshToken } = generateTokens({ userId: user._id })

        res.cookie("refreshToken", refreshToken, { httpOnly: true })

        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            success: true,
            message: "user registered successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                }
            },
            accessToken
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

/* get : /api/auth/me */
router.get("/me", async (req, res) => {
    const accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({
            message: "Unauthorized, access token not found",
        })
    }

    try {
        const decoded = verifyAccessToken(accessToken)

        const user = await userModel.findById(decoded.id)

        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                }
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, Invalid or expired token",
        })
    }
})

/* post : /api/auth/refresh */
router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Unauthorizd, refresh token not found",
        })
    }

    try {
        const decoded = verifyRefreshToken(refreshToken)

        const user = await userModel.findById(decoded.id)

        if (refreshToken !== user.refreshToken) {
            user.refreshToken = null;
            await user.save();

            return res.status(401).json({
                message: "Unauthorized refresh token mismatch",
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user._id })

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({
            message: "token refresh successfully",
            accessToken,
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized, Invalid or expired refresh token"
        })
    }
})

export default router;