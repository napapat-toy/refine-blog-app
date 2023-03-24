import express from 'express'

import { getAllBlogs, getBlogDetail, createBlog, updateBlog, deleteBlog } from '../controllers/blog.controller.js'

const router = express.Router()

router.route('/').get(getAllBlogs)
router.route('/:id').get(getBlogDetail)
router.route('/').post(createBlog)
router.route('/:id').patch(updateBlog)
router.route('/:id').delete(deleteBlog)

export default router