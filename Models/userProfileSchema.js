import mongoose from "mongoose";

const userProfileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String
    }
})

const UserProfile = mongoose.model("user-profile", userProfileSchema)

export default UserProfile