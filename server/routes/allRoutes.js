const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const projectRoutes = require('./projectRoutes')

router.use('/user', userRoutes)
router.use('/project', projectRoutes)

module.exports = router