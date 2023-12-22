// Importing required modules and controllers
const express = require('express');
const {
    getGoalsController,
    getGoalController,
    insertGoalController,
    updateGoalController,
    deleteGoalController,
    renderInsertGoalPage
} = require('../controllers/goalController');
const { validateGoal, validateGoalUpdate } = require('../validations/goal-validator');
const router = express.Router();

// Route to get all goals of a user
router.get('/goals/:userID', getGoalsController);

router.get('/insertGoals/:userID',renderInsertGoalPage);

// Route to get a specific goal
router.get('/goal', getGoalController);

// Route to insert a new goal
router.post('/insert-goal', validateGoal, insertGoalController);

// Route to update a goal
router.put('/goal', validateGoalUpdate, updateGoalController);

// Route to delete a goal
router.delete('/goal', deleteGoalController);

// Exporting the router
module.exports = router;
