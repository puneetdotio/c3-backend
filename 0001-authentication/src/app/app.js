import express from "express"
import userModel from './../models/user.model.js';
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { authenticate } from './../middleware/auth.middleware.js';

dotenv.config();

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Authenticate API",
    })
})

app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const user = await userModel.create({
            email,
            name,
            password: await bcrypt.hash(password, 10)
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: {
                user: {
                    email,
                    name,
                    id: user._id,
                },
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
        data: {
            user: req.user,
        }
    })
})

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    const isValidPassword = bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        return res.status(400).json({
            success: false,
            message: "Invaid email or password",
        })
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.status(200).json({
        success: true,
        message: "user loggedIn successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
            }
        },
        token,
    })

})

export default app;