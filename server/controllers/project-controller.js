const ProjectModel = require('../models/project-model')
const uploadToCloudinary = require('../utils/uploadToCloudinary')


// ================================
// get all project in optimized way
// ================================
const getProjects = async (req, res) => {
    try {
        const { features, category, limit = 10, page = 1 } = req.query;

        let query = {}

        if (featured === 'true') {
            query.featured = true
        }

        if (category) {
            query.category = category
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const projects = await ProjectModel.find(query)
            .sort({ featured: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))

        const total = await ProjectModel.countDocuments(query)

        return res.status(200).json({
            success: true,
            count: projects.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            projects: projects

        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}
// ===========================
// get project by single Id
// ===========================
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params

        const project = await ProjectModel.findById(id)

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Invalid Project ID"
            })
        }

        return res.status(200).json({
            success: true,
            project: project
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

// ============
// Create Project (only admin)
// ==================

const createProject = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { title, subtitle, description, liveUrl, githubUrl, technologies, featured, category } = req.body;


        const imageData = {}

        if (req.file) {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer)
            imageData = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id,
            }
        }


        const project = await ProjectModel.create({
            title,
            subtitle,
            description,
            liveUrl,
            githubUrl,
            technologies,
            featured,
            category,
            imageUrl: imageData,
            createdBy: userId
        })

        return res.status(201).json({
            success: true,
            project: project
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

// ========
// Update Project
// ===============



const updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user?._id
        const { title, subtitle, description, liveUrl, githubUrl, technologies, featured, category } = req.body;

        const projectExists = await ProjectModel.findById(id)
        if (!projectExists) {
            return res.status(400).json({
                success: false,
                message: "Bad Request || Project Not Available"
            })
        }

        const updateData = {}

        if (req.file) {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer)
            updateData.imageUrl = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            }
        }

        if (title !== undefined || title !== null) {
            updateData.title = title
        }
        if (subtitle !== undefined || subtitle !== null) {
            updateData.subtitle = subtitle
        }
        if (description !== undefined || description !== null) {
            updateData.description = description
        }
        if (liveUrl !== undefined || liveUrl !== null) {
            updateData.liveUrl = liveUrl
        }
        if (githubUrl !== undefined || githubUrl !== null) {
            updateData.githubUrl = githubUrl
        }
        if (technologies !== undefined || technologies !== null) {
            updateData.technologies = technologies
        }
        if (featured !== undefined || featured !== null) {
            updateData.featured = featured
        }
        if (category !== undefined || category !== null) {
            updateData.category = category
        }

        const updatedProject = await ProjectModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidator: true
        })

        return res.status(200).json({
            success: true,
            project: updatedProject
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}
const deleteProject = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { id } = req.params;
        const project = await ProjectModel.findById(id)

        if (project.createdBy?.toString() !== userId?.toString()) {
            return res.status(401).json({
                success: false,
                message: "You are not Authorized to Delete this project"
            })
        }

        await ProjectModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}