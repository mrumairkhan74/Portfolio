const express = require('express')
const router = express.Router();


const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/project-controller')
const { verifyAccessToken, isAdmin } = require('../middleware/verifyAccessToken')
const upload = require('../config/upload')


router.get('/', getProjects)
router.get('/:id', getProjectById)

router.use(verifyAccessToken)
router.use(isAdmin)


router.post('/', upload.single('imageUrl'), createProject)
router.put('/:id', upload.single('imageUrl'), updateProject)
router.delete('/:id', deleteProject)



module.exports = router