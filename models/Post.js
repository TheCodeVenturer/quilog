import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]

}, {timestamps: true})

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema)