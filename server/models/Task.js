const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'To Do', // Options: 'To Do', 'In Progress', 'Done'
    },
    priority: {
        type: String,
        required: true,
        default: 'Medium', // Options: 'Low', 'Medium', 'High'
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
