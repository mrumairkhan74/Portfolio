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
const upload = require('../config/upload')

router.use(verifyToken)

router.get('/', getProjects)
router.post('/create', upload.single('imageUrl'), createProject)
router.patch('/:id', upload.single('imageUrl'), updateProject)
router.delete('/:id', deleteProject)
router.get('/:id', getProjectById)



module.exports = router