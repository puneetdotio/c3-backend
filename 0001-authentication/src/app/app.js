import express from "express"
import userModel from './../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from './../config/config.js';
import { authenticate } from './../middleware/auth.middleware.js';

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to authentication api",
    })
})

app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await userModel.create({
            email,
            name,
            password: await bcrypt.hash(password, 10),
        })

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET)

        res.status(201).json({
            success: true,
            message: "user creted successfully",
            data: {
                user: { email, name, },
                token,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

app.get("/api/auth/me", authenticate, async (req, res) => {
    console.log(req.user)

    res.status(200).json({
        success: true,
        message: "user fetched via middleware",
        data: {
            user: req.user,
        }
    })
})

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        const isValidatePassword = bcrypt.compare(password, user.password)

        if (!isValidatePassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            })
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: "user loggedin successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

export default app;