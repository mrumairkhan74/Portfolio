const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    tags: [{
        type: String,
    }],
    category: {
        type: String,
        trim: true
    },
    img: {
        url: String,
        public_id: String,
        fileName: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

blogSchema.index({ title: 1 })

module.exports = mongoose.model('blog', blogSchema)