const express = require('express')
const router = express.Router()
const userRoutes = require('./user-routes')
const projectRoutes = require('./project-routes')
const blogRoutes = require('./blog-routes')
router.use('/user', userRoutes)
router.use('/project', projectRoutes)
router.use('/blog', blogRoutes)
module.exports = router