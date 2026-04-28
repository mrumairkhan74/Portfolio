const express = require('express')
const router = express.Router();


const userRoutes = require('./user-routes')
const projectRoutes = require('./project-routes')


router.use('/user', userRoutes)
router.use('/project', projectRoutes)


module.exports = router