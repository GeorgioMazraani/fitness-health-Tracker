const express = require('express');
const router = express.Router();
const { getAchievementsController, addAchievementController} = require('../controllers/achievementController'); 

router.get('/achievements', getAchievementsController);
router.post('/achievement', addAchievementController);

module.exports = router;
