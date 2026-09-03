import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found",
        })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(data.id);

    req.user = user;

    next();
}