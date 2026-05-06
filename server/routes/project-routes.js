const express = require('express')

const router = express.Router()


const {
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjects
} = require('../controllers/project-controller')


const { verifyToken } = require('../middlewares/verify-token')


router.use(verifyToken)

router.get('/', getProjects)
router.post('/create', createProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)
router.get('/:id', getProjectById)



module.exports = router