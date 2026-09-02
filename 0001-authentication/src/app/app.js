import express from "express"
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Welcome to authentication api",
    })
})

app.post("/api/auth/register", (req, res) => {
    const { email, name, password } = req.body;

    const token = jwt.sign({ email, name }, "ff2b7e5263ceeb79ea0d3092c3beb0ba")

    res.status(201).json({
        success: true,
        message:"user created successfully",
        data: {
            user: {
                email, name
            },
            token,
        }
    })
})

export default app;