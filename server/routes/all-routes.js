const express = require('express')
const router = express.Router();


const userRoutes = require('./user-routes')
const projectRoutes = require('./project-routes')
const contactRoutes = require('./contact-routes')

router.use('/auth', userRoutes)
router.use('/projects', projectRoutes)
router.use('/contact', contactRoutes)


module.exports = router