import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("connected to database...")
    } catch (error) {
        console.log("Error while connecting to database", error)
    }
}

export default connectToDB;