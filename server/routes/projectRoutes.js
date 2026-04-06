const express = require('express');
const {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// router.use(protect); // TODO: Protect all project routes

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;
