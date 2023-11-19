const { getGoals, getGoal, insertGoal, updateGoal, deleteGoal } = require('../services/goalService');
const { validationResult } = require('express-validator');

const getGoalsController = async (req, res) => {
    const { userID } = req.body;
    try {
        const goalsUserId = await getGoals(userID);
        res.status(200).json({ goals: goalsUserId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getGoalController = async (req, res) => {
    const { goalID } = req.body;
    try {
        const goalByID = await getGoal(goalID);
        res.status(200).json({ goals: goalByID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const insertGoalController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const goal = req.body;
    try {
        const insertedGoal = await insertGoal(goal);
        res.status(200).json({ insertedGoal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateGoalController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const goal = req.body;
    try {
        const updatedGoal = await updateGoal(goal);
        res.status(200).json({ updatedGoal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteGoalController = async (req, res) => {
    const { goalID } = req.body.goalID;
    try {
        const deletedGoal = await deleteGoal(goalID);
        res.status(200).json({ deletedGoal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getGoalsController,
    getGoalController,
    insertGoalController,
    updateGoalController,
    deleteGoalController
};

