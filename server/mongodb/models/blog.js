import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: true },
        shortDesc: { type: String },
        likes: { type: Number, default: 0 },
        favorite: { type: Number, default: 0 },
        picture: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true
    }
)

const blogModel = mongoose.model('Blog', BlogSchema)

export default blogModel