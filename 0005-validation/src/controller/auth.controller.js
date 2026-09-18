import userModel from "../models/user.model.js";

export async function register(req, res) {
    const { email, password, phone } = req.body;

    const user = await userModel.create({
        email,
        phone,
        password: password, // hash password
    })

    return res.status(201).json({
        message: "user registered successfully",
        data: {
            email,
            phone,
            id: user._id,
        }
    })
}