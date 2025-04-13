import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,        
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        tags: [String],
        category: {
            type: String,
            required: true
        },
        image: {
            type: String, // cloudinary url
        },
        comments:[
            {
                user: String,
                text: String,
                createdAt:{
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },{timestamps:true}
)

export const Post = mongoose.model("Post",postSchema)