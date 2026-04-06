const Project = require('../models/Project');
const Task = require('../models/Task');

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Private
 */
const getProjects = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const projects = await Project.find({ members: req.user._id })
            .populate('members', 'name email role')
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { name, description, deadline, status, members } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        // Ensure the creator is always a project member.
        const memberIds = Array.isArray(members) ? members : [];
        if (!memberIds.includes(String(req.user._id))) {
            memberIds.push(req.user._id);
        }

        const project = await Project.create({
            name,
            description,
            deadline: deadline || null,
            status: status || 'active',
            members: memberIds,
        });

        res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Update an existing project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const isMember = project.members.some(
            (memberId) => String(memberId) === String(req.user._id)
        );

        if (!isMember) {
            return res.status(403).json({ message: 'Forbidden: project access denied' });
        }

        const { name, description, deadline, status, members } = req.body;

        project.name = name || project.name;
        project.description = description || project.description;
        project.deadline = deadline !== undefined ? deadline : project.deadline;
        project.status = status || project.status;
        project.members = members !== undefined ? members : project.members;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const isMember = project.members.some(
            (memberId) => String(memberId) === String(req.user._id)
        );

        if (!isMember) {
            return res.status(403).json({ message: 'Forbidden: project access denied' });
        }

        // Cascade: delete all tasks belonging to this project
        await Task.deleteMany({ project: req.params.id });

        await Project.deleteOne({ _id: req.params.id });
        res.json({ message: 'Project and associated tasks removed' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
