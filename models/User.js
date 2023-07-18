import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default:""
    },
    Linkedin:{
        type:String,
        default:""
    },
    Twitter:{
        type:String,
        default:""
    },
    Instagram:{
        type:String,
        default:""
    },
    Youtube:{
        type:String,
        default:""
    },
    Website:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)