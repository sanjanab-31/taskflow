const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
    // Implement user registration logic here
    // 1. Get user data from req.body
    // 2. Check if user already exists
    // 3. Create a new user
    // 4. Return success with token
    res.status(200).json({ message: 'Register user endpoint' });
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    // Implement user login logic here
    // 1. Get user data (email/password) from req.body
    // 2. Find user in database
    // 3. Validate password (bcryptjs handle)
    // 4. Return success with token
    res.status(200).json({ message: 'Login user endpoint' });
};

module.exports = { registerUser, loginUser };
