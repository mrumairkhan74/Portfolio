const express = require('express')
const router = express.Router();


const { registerUser, loginUser, getMe } = require('../controllers/user-controller')
const { verifyAccessToken } = require('../middleware/verifyAccessToken')


router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/get-me', verifyAccessToken, getMe)


module.exports = router