import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
   
    public_id: {
        type: String,
    },
    url: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
export const Image = mongoose.model('Image', imageSchema);