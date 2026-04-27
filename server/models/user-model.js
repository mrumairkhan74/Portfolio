const mongoose = require('mongoose')
const db = require('../config/db')
const bcrypt = require('bcryptjs');



const schema = mongoose.Schema;


const userSchema = new schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [50, "name cannot be more then 50 character"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profileImg: {
        url: String,
        public_id: String
    },
    bio: {
        type: String,
        trim: true
    },
    skills: [{
        type: String
    }],
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })



userSchema.pre('save', async () => {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSalt(12)
    const password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.index({ email: 1, role: 1 })
module.exports = mongoose.model('user', userSchema)