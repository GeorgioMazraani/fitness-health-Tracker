// Importing required modules and controllers
const express = require('express');
const { getAchievementsController, addAchievementController } = require('../controllers/achievementController');
const router = express.Router();

// Route to get achievements for a user
router.get('/achievements/:userID', getAchievementsController);

// Route to add a new achievement
router.post('/achievement', addAchievementController);

// Exporting the router
module.exports = router;
