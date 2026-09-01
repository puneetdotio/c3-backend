import express from "express"
import jwt from "jsonwebtoken"

const app = express();

app.use(express.json())

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Welcome to the authention api",
    })
})

app.post("/api/auth/register", (req, res) => {
    const { email, name, password } = req.body;

    /* save data to db */

    const token = jwt.sign({ email, name }, "e0597c431ecdc7ab4a9b2377c2ea2eb4ff84ee7072119c811bf70bd8c02f239d")

    res.status(201).json({
        success: true,
        data: {
            user: { email, name },
            token,
        }
    })
})

export default app;