const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // Protect all user routes

router.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile);

module.exports = router;
