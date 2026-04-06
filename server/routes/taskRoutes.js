const express = require('express');
const {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // Protect all task routes

router.post('/', createTask);

router.get('/:projectId', getTasksByProject);

router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;
