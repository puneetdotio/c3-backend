import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    password: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel;