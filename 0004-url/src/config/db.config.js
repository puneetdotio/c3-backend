import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Connected to Database...")
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export default connectToDB;