import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

export default mongoose?.models?.Comment || mongoose.model("Comment", CommentSchema)