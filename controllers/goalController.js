const { getGoals, getGoal, insertGoal, updateGoal, deleteGoal } = require('../services/goalService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve all goals of a user.
 * This function handles the HTTP request and response for getting all goals associated with a user.
 * It extracts the userID from the request body and uses the `getGoals` service to retrieve the goals.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
const getGoalsController = async (req, res) => {
    const { userID } = req.body;
    try {
        const goalsUserId = await getGoals(userID);
        res.status(200).json({ goals: goalsUserId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to retrieve a specific goal by its ID.
 * This function handles the HTTP request and response for getting a specific goal.
 * It extracts the goalID from the request body and uses the `getGoal` service to retrieve the goal.
 * 
 * @param {Object} req - The request object containing goalID.
 * @param {Object} res - The response object.
 */
const getGoalController = async (req, res) => {
    const { goalID } = req.body;
    try {
        const goalByID = await getGoal(goalID);
        res.status(200).json({ goals: goalByID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to insert a new goal.
 * This function handles the HTTP request and response for adding a new goal.
 * It performs validation checks on the request, extracts the goal details from the request body, 
 * and uses the `insertGoal` service to store the new goal.
 * 
 * @param {Object} req - The request object containing goal details.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to update an existing goal.
 * This function handles the HTTP request and response for updating a goal.
 * It performs validation checks on the request, extracts the updated goal details from the request body,
 * and uses the `updateGoal` service to update the goal.
 * 
 * @param {Object} req - The request object containing updated goal details.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to delete a goal.
 * This function handles the HTTP request and response for deleting a goal.
 * It extracts the goalID from the request body and uses the `deleteGoal` service to delete the goal.
 * 
 * @param {Object} req - The request object containing goalID.
 * @param {Object} res - The response object.
 */
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

