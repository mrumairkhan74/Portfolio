const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const uploadToCloudinary = require('../utils/uploadToCloudinary')

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    path: '/'
}

const accessToken_Max_AGE = 15 * 60 * 1000
const refreshToken_Max_AGE = 30 * 24 * 60 * 60 * 1000

const setAccessToken = (res, token) => { 
    res.cookie("token", token, { ...cookieOption, maxAge: accessToken_Max_AGE }) 
}

const setRefreshToken = (res, token) => { 
    res.cookie("refreshToken", token, { ...cookieOption, maxAge: refreshToken_Max_AGE }) 
}

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Check if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        let imageData = {}

        if (req.file) {
            try {
                const cloudinaryResult = await uploadToCloudinary(req.file.buffer)
                imageData = {
                    url: cloudinaryResult.secure_url,
                    public_id: cloudinaryResult.public_id
                }
            } catch (uploadError) {
                console.error('Image upload error:', uploadError)
                return res.status(400).json({
                    success: false,
                    message: "Failed to upload image"
                })
            }
        }

        const hashPassword = await hashedPassword(password)
        
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
            image: imageData
        })

        // Generate tokens before removing password
        const { accessToken, refreshToken } = generateToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            image: user.image
        })

        // Set cookies
        setAccessToken(res, accessToken)
        setRefreshToken(res, refreshToken)

        // Prepare user response (exclude password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            image: user.image,
            createdAt: user.createdAt
        }

        return res.status(201).json({
            success: true,
            message: "Created Successfully",
            user: userResponse
        })
    }
    catch (error) {
        console.error('Register error:', error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const userExists = await userModel.findOne({ email }).select("+password")
        
        if (!userExists) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, userExists.password)
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const { accessToken, refreshToken } = generateToken({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role || 'user',
            image: userExists.image
        })

        setAccessToken(res, accessToken)
        setRefreshToken(res, refreshToken)

        // Prepare user response (exclude password)
        const userResponse = {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role || 'user',
            image: userExists.image
        }

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            user: userResponse
        })
    }
    catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

const getMe = async (req, res, next) => {
    try {
        const userId = req.user?._id
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            })
        }
        
        const user = await userModel.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        
        return res.status(200).json({
            success: true,
            user: user
        })
    }
    catch (error) {
        console.error('GetMe error:', error)
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

// Add logout function
const logout = async (req, res, next) => {
    try {
        res.clearCookie('token', cookieOption)
        res.clearCookie('refreshToken', cookieOption)
        
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = {
    register,
    loginUser,
    getMe,
    logout
}