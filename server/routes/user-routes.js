const express = require('express')
const router = express.Router();
const rateLimit = require('express-rate-limit')


const { register, loginUser, getMe } = require('../controllers/user-controller')
const { verifyToken, verifyRefreshToken } = require('../middlewares/verify-token')
const upload = require('../config/upload');


const strictLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: "Too Many Request, Try again later" },
    standardHeaders: true,
    legacyHeaders: false
})


router.post('/register', upload.single('image'), register)
router.post('/login', strictLimit, loginUser)
router.use(verifyToken)
router.get('/me', getMe)



module.exports = router


