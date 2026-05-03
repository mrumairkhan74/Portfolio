const jwt = require('jsonwebtoken')


const secretToken = process.env.JWT_SECRET_KEY
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY



const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({
            success: false,
            message: "No Token Provided"
        })

        const decoded = jwt.verify(token, secretToken)

        req.user = decoded
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Expired Token" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid Token" })
        }
        console.error("Jwt verification error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

const verifyRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken
        if (!token) {
            return res.status(401).json({ error: "Invalid Token" })
        }
        const decoded = jwt.verify(token, refreshSecret)
        req.user = decoded
        next()
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Expired Token" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid Token" })
        }
        console.error("Jwt verification error", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


module.exports = {
    verifyToken,
    verifyRefreshToken
}