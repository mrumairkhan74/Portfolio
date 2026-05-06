const jwt = require('jsonwebtoken')

const secretToken = process.env.JWT_SECRET_KEY
const secretTokenExpiry = process.env.JWT_EXPIRY
const RefreshSecretToken = process.env.JWT_REFRESH_SECRET_KEY
const RefreshSecretTokenExpiry = process.env.JWT_REFRESH_EXPIRY



const generateToken = ({ _id, name, email, image }) => {
    const payload = {
        _id,
        name,
        email,
        image
    }

    const accessToken = jwt.sign(payload, secretToken, { expiresIn: secretTokenExpiry })


    const refreshPayload = {
        _id,
        name,
        email,
        image
    }

    const refreshToken = jwt.sign(refreshPayload, RefreshSecretToken, { expiresIn: RefreshSecretTokenExpiry })

    return { accessToken, refreshToken }
}



module.exports = generateToken