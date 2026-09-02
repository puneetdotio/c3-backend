import express from "express"
import jwt from "jsonwebtoken"

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Welcome to authentication API",
    })
})

app.post("/api/auth/register", (req, res) => {
    try {
        const { email, name, password } = req.body;

        const token = jwt.sign({ email, name }, "12e6e7be58ae7f2b55f453b3df789d7b")

        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: {
                user: { email, name },
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

export default app;