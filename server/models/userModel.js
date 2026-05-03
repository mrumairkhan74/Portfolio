const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    password: {
        type: String,
        trim: true,
        match: [/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%.-^&*]).{8,}$/]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    image: {
        url: String,
        public_id: String
    }
}, { timestamps: true })


userSchema.index({ email: 1 })


module.exports = mongoose.model('user', userSchema)