const express = require('express');
const { getGoalsController, getGoalController, insertGoalController, updateGoalController, deleteGoalController } = require('../controllers/goalController');
const router = express.Router();
const { validateGoal, validateGoalUpdate } = require('../validations/goal-validator');

router.get('/goals', getGoalsController);
router.get('/goal', getGoalController);
router.post('/goal', validateGoal, insertGoalController);
router.put('/goal', validateGoalUpdate, updateGoalController);
router.delete('/goal', deleteGoalController);

module.exports = router;
