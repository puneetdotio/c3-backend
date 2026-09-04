import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel;