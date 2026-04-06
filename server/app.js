const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Import global error middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
// Allows Cross-Origin Resource Sharing
app.use(cors()); 
// Parses incoming requests with JSON payloads
app.use(express.json()); 
// Parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true })); 

// Basic route to test server
app.get('/', (req, res) => {
  res.send('TaskFlow API is running...');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Mount error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
