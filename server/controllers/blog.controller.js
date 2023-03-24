import mongoose from 'mongoose'
import Blog from '../mongodb/models/blog.js'
import User from '../mongodb/models/user.js'

import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})

        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getBlogDetail = async (req, res) => {
    const { id } = req.params
    const blogExists = await Blog.findOne({ _id: id }).populate('author')

    if (blogExists) {
        res.status(200).json(blogExists)
    } else {
        res.status(404).json({ message: 'Blog not found' })
    }
}

const createBlog = async (req, res) => {
    try {
        const { title, description, shortDesc, email, picture } = req.body

        // Start session
        const session = await mongoose.startSession()
        session.startTransaction()

        const user = await User.findOne({ email }).session(session)

        if (!user) throw new Error('User not found')

        let photoUrl = "";

        let picNameTrim = picture.name.split('.').slice(0, -1).join('.')

        if (picture) photoUrl = await cloudinary.uploader.upload(picture.url, { public_id: picNameTrim })

        const newBlog = await Blog.create({
            title,
            description,
            shortDesc: shortDesc === '' ? 'No short description' : shortDesc,
            picture: photoUrl.url,
            author: user._id
        })

        user.allBlogs.push(newBlog._id)
        await user.save({ session })

        await session.commitTransaction()

        res.status(200).json({ message: 'Blog created successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, shortDesc, picture, likes, favorite } = req.body

        let photoUrl = "";

        let picNameTrim = picture.name.split('.').slice(0, -1).join('.')

        if (picture) photoUrl = await cloudinary.uploader.upload(picture.url, { public_id: picNameTrim })

        await Blog.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            shortDesc,
            picture: photoUrl.url,
            likes,
            favorite
        })

        res.status(200).json({ message: 'Blog has been updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params

        const blogToDelete = await Blog.findById({ _id: id }).populate('author')

        if (!blogToDelete) throw new Error('Blog not found')

        const session = await mongoose.startSession()
        session.startTransaction()

        await blogToDelete.deleteOne({ session })
        await blogToDelete.author.allBlogs.pull(blogToDelete)

        await blogToDelete.author.save({ session })
        await session.commitTransaction()

        res.status(200).json({ message: 'Blog has been deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    getAllBlogs,
    getBlogDetail,
    createBlog,
    updateBlog,
    deleteBlog
}