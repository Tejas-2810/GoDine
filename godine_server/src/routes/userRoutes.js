const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET user profile
router.get('/:userID', userController.getUserProfile);

// PUT update user profile
router.put('/edit/:userID', userController.updateUserProfile);

module.exports = router;
