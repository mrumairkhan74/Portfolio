const mongoose = require('mongoose')


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    fullDescription: {
        type: String,
        trim: true
    },
    technologies: [{
        type: String,
        trim: true
    }],
    liveUrl: {
        type: String,
        trim: true,
    },
    githubUrl: {
        type: String
    },
    category: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number
    },
    comments: {
        type: String
    },
    imageUrl: {
        url: String,
        public_id: String
    },
    date: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


projectSchema.index({ title: 1, liveUrl: 1, githubUrl: 1 })


module.exports = mongoose.model('projects', projectSchema)