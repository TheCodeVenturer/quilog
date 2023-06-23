import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
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

export default mongoose?.models?.Comment || mongoose.model("Comment", CommentSchema)