const Project = require('../models/Project');
const Task = require('../models/Task');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Private
 */
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('team', 'name email isAdmin').sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res) => {
    try {
        const { name, description, deadline, status, team } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        const project = await Project.create({
            user: req.user?._id || null,
            name,
            description,
            deadline: deadline || null,
            status: status || 'Not Started',
            team: team || [],
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Private
 */
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('team', 'name email isAdmin');

        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Update an existing project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const { name, description, deadline, status, team } = req.body;

        project.name = name || project.name;
        project.description = description || project.description;
        project.deadline = deadline !== undefined ? deadline : project.deadline;
        project.status = status || project.status;
        project.team = team !== undefined ? team : project.team;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Cascade: delete all tasks belonging to this project
        await Task.deleteMany({ project: req.params.id });

        await Project.deleteOne({ _id: req.params.id });
        res.json({ message: 'Project and associated tasks removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
};
