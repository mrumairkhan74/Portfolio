const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const JWT_SECRET = process.env.JWT_SECRET_KEY
const JWT_EXPIRY = process.env.JWT_EXPIRE


const generateToken = async (userId) => {
    jwt.sign({
        _id: userId,
        id: userId
    },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY || '15m' }
    )
}


const verifyAccessToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        const decoded = jwt.verify(token, JWT_SECRET, { expiresIn: JWT_EXPIRY })

        const user = await User.findById(decoded._id).select('-password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Token invalid.'
            });
        }
        req.user = user

        next()
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        next(error)
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(401).json({
            success: false,
            message: "UnAuthorized Attempt, Admin Only"
        })
    }
}
module.exports = { generateToken, verifyAccessToken, isAdmin }