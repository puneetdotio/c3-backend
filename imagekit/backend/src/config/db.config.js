const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB database")
    } catch (error) {
        console.log("error while connecting to database")
    }
}

module.exports = connectToDB;