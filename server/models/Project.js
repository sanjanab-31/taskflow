const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Not Started', // Options: 'Not Started', 'In Progress', 'Completed'
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
