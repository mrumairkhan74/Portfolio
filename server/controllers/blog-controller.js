const blogModel = require('../models/blog-model')
const uploadToCloudinary = require('../utils/upload-to-cloudinary')

const { deleteFromCloudinary, deleteMultipleFromCloudinary } = require('../utils/delete-from-cloudinary');


const getBlogs = async (req, res, next) => {
    try {
        const { title, page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        let filter = {};
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        const total = await blogModel.countDocuments(filter);

        const blogs = await blogModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .lean();

        return res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage: pageNum * limitNum < total,
                hasPrevPage: pageNum > 1
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate if ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required"
            });
        }

        // Find blog by ID
        const blog = await blogModel
            .findById(id)
            .populate('createdBy', 'name email') // Optional: populate user info
            .lean();

        // Check if blog exists
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Optional: Increment view count
        await blogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        console.error(error);

        // Handle invalid ObjectId format
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID format"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


const createBlog = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { title, description, content, category, tags } = req.body;

        let imageData = {};
        if (req.file) {
            const upload = await uploadToCloudinary(req.file.buffer);
            imageData = {
                url: upload.secure_url,
                public_id: upload.public_id
            };
        }

        const blog = await blogModel.create({
            title,
            description,
            content,
            tags,
            category,
            img: imageData,
            createdBy: userId  // ✅ Add this to associate blog with user
        });

        return res.status(201).json({
            success: true,
            blog: blog
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const { title, description, content, tags, category } = req.body;


        const existingBlog = await blogModel.findById(id);

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        if (existingBlog.createdBy?.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized to update this blog"
            });
        }

        const updateData = {};

        // ✅ Fixed conditions - only add if value is provided
        if (title !== undefined && title !== null && title !== '') updateData.title = title;
        if (description !== undefined && description !== null && description !== '') updateData.description = description;
        if (content !== undefined && content !== null && content !== '') updateData.content = content;
        if (tags !== undefined && tags !== null) updateData.tags = tags;
        if (category !== undefined && category !== null && category !== '') updateData.category = category;

        if (req.file) {
            const upload = await uploadToCloudinary(req.file.buffer);
            updateData.img = {
                url: upload.secure_url,
                public_id: upload.public_id
            };
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully updated",
            blog: updatedBlog
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }


        if (blog.createdBy?.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized to delete this blog"
            });
        }


        if (blog.img?.public_id) {
            await deleteFromCloudinary(blog.img.public_id);
        }
        await blogModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} 