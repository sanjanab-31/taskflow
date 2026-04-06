const Task = require('../models/Task');

/**
 * @desc    Get tasks by project
 * @route   GET /api/tasks?projectId=xxx
 * @access  Private
 */
const getTasksByProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const projectId = req.query.projectId || req.params.projectId;
        if (!projectId) {
            return res.status(400).json({ message: 'projectId is required' });
        }

        const tasks = await Task.find({ projectId })
            .populate('assignedTo', 'name email')
            .populate('projectId', 'name')
            .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { title, description, status, priority, deadline, assignedTo, projectId } = req.body;

        if (!title || !projectId) {
            return res.status(400).json({ message: 'Task title and projectId are required' });
        }

        const task = await Task.create({
            title,
            description: description || '',
            status: status || 'todo',
            priority: priority || 'medium',
            deadline: deadline || null,
            assignedTo: assignedTo || null,
            projectId,
        });

        res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const { title, description, status, priority, deadline, assignedTo } = req.body;

        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.deadline = deadline !== undefined ? deadline : task.deadline;
        task.assignedTo = assignedTo !== undefined ? assignedTo : task.assignedTo;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task removed' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask,
};
