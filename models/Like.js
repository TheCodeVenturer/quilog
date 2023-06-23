import mongoose from "mongoose";
const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName:{
        type: String,
        required: true,                                                                                         
    },
    userImage:{
        type: String,
    }
}, {timestamps: true})

export default mongoose?.models?.Like || mongoose.model("Like", LikeSchema)