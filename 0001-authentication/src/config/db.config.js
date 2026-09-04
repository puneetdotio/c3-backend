import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("connected to Database")
    } catch (error) {
        console.log("error while connecting to database")
    }
}

export default connectToDB;