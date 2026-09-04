import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("connected To database")
    } catch (error) {
        console.log("error while connecting to database")
    }
}

export default connectToDB;