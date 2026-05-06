const express = require('express')

const {
    getBlogs,
    getBlogById,  // Add this
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blog-controller')

const { verifyToken } = require('../middlewares/verify-token')

const router = express.Router()

router.get('/', getBlogs)


router.post('/create', verifyToken, createBlog)
router.put('/:id', verifyToken, updateBlog)
router.delete('/:id', verifyToken, deleteBlog)

router.get('/:id', getBlogById)

module.exports = router