const UserModel = require('../models/user-model')
const { generateToken } = require('../middleware/verifyAccessToken')



const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Conflict Email already Exists "
            })
        }


        const newUser = await UserModel.create({
            name,
            email,
            password
        }).select('-password')


        const token = generateToken(newUser._id)


        res.cookie('token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 60 * 1000
            }
        )

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                _id: newUser._id,
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
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


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const isPasswordMatched = user.matchPassword(password)

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = await generateToken(user._id)
        res.cookie('token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 60 * 1000
            }
        )


        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: {
                _id: req.user._id,
                id: req.user._id.toString(),
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                bio: req.user.bio,
                skills: req.user.skills
            }
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
    registerUser,
    loginUser,
    getMe
}