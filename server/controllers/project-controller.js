const projectModel = require('../models/project-model')


const uploadToCloudinary = require('../utils/upload-to-cloudinary')


const createProject = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const {
            title,
            description,
            fullDescription,
            technologies,
            liveURl,
            githubUrl,
            category,
            featured,
        } = req.body


        const imageData = {}
        if (req.file) {
            const uploadCloudinary = await uploadToCloudinary(req.file.buffer)
            imageData = {
                url: uploadCloudinary.secure_url,
                public_id: uploadCloudinary.public_id
            }
        }


        const project = await projectModel.create({
            title,
            description,
            fullDescription,
            technologies,
            liveURl,
            githubUrl,
            category,
            featured,
            imageUrl: imageData,
            createdBy: userId
        })

        if (!project) return res.status(404).json({
            success: false,
            message: "Invalid Details"
        })

        return res.status(201).json({
            success: true,
            message: "Created Successfully",
            project: project
        })

    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server Internal Error"
        })
    }
}
const updateProject = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { id } = req.params;

        const project = await projectModel.findById(id)

        let updateData = {}

        const allowedField = ['title', 'description', 'fullDescription', 'technologies', 'liveUrl', 'githubUrl', 'category', 'featured']
        if (req.file !== undefined || req.file !== null) {
            const upload = await uploadToCloudinary(req.file)
            updateData.imageUrl = {
                url: upload.secure_url,
                public_id: upload.public_id
            }
        }


        if (project.createdBy?.toString() !== userId?.toString()) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized"
            })
        }

        const updatedProject = await projectModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        return res.status(200).json({
            success: true,
            message: "Updated Successfully",
            project: updatedProject
        })

    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server Internal Error"
        })
    }
}
const getProjects = async (req, res, next) => {
    try {
        const { title, page = 1, limit = 10 } = req.query;

        // Build query object
        const query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }

        // Calculate skip value for pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get total count for pagination metadata
        const totalProjects = await projectModel.countDocuments(query);

        // Get paginated projects
        const projects = await projectModel
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        if (projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Projects Available right now"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All Projects below",
            projects: projects,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalProjects / parseInt(limit)),
                totalProjects: totalProjects,
                limit: parseInt(limit)
            }
        });
    }
    catch (error) {
        console.error(error); // Log the actual error for debugging
        return res.status(500).json({
            success: false, // Changed to false
            message: "Server Internal Error"
        });
    }
};



const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const project = await projectModel.findById(id)

        return res.status(200).json({
            success: true,
            message: "Selected Project",
            project: project,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server Internal Error"
        })
    }
}
const deleteProject = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const { id } = req.params;


        const project = await projectModel.findById(id)

        if (project.createdBy?.toString() !== userId.toString()) {
            return res.status(401).json({
                success: true,
                message: "UnAuthorized to Delete this"
            })
        }

        await projectModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server Internal Error"
        })
    }
}




module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjects
}