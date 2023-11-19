const { query } = require('../database/db');
const moment = require('moment');

/**
 * Retrieves all goal entries for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of goal objects.
 */
const getGoals = async (userID) => {
    try {
        let sql = "SELECT * FROM goals where userID=?";
        const goals = await query(sql, [userID]);
        return goals;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific goal by its ID.
 * @param {number} goalID - The unique identifier of the goal.
 * @returns {Promise<Object>} A promise that resolves to a goal object.
 */
const getGoal = async (goalID) => {
    try {
        let sql = "SELECT * from goals where goalID=?";
        const goal = await query(sql, [goalID]);
        return goal;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new goal entry for a user.
 * @param {Object} goal - The goal object containing userID, startDate, endDate, initialWeight, targetWeight, and progress.
 * @returns {Promise<Object>} A promise that resolves to the newly inserted goal object.
 */
const insertGoal = async (goal) => {
    try {
        let insertSql = `
            INSERT INTO goals (userID, startDate, endDate, initialWeight, targetWeight, progress) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        await query(insertSql, [
            goal.userID,
            moment(goal.startDate).format('YYYY-MM-DD'),
            moment(goal.endDate).format('YYYY-MM-DD'),
            goal.initialWeight,
            goal.targetWeight,
            goal.progress
        ]);
        let insertedGoal = await query("SELECT * FROM goals WHERE userID = ? ORDER BY goalID DESC LIMIT 1", [goal.userID]);

        return insertedGoal;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates an existing goal entry.
 * @param {Object} goal - The goal object containing goalID, userID, startDate, endDate, initialWeight, targetWeight, and progress.
 * @returns {Promise<void>} A promise that resolves when the goal is updated.
 */
const updateGoal = async (goal) => {
    try {
        let updateSql = `
            UPDATE goals SET startDate = ?, endDate = ?, initialWeight = ?, targetWeight = ?, progress = ?
             WHERE goalID = ? AND userID = ?`;
        await query(updateSql, [
            moment(goal.startDate).format('YYYY-MM-DD'),
            moment(goal.endDate).format('YYYY-MM-DD'),
            goal.initialWeight,
            goal.targetWeight,
            goal.progress,
            goal.goalID, // Assuming this property contains the ID of the goal to update
            goal.userID
        ]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a goal entry based on the provided goalID.
 * @param {number} goalID - The unique identifier of the goal to be deleted.
 * @returns {Promise<void>} A promise that resolves when the goal is deleted.
 */
const deleteGoal = async (goalID) => {
    goalID = parseInt(goalID, 10);
    try {
        return await query("DELETE FROM goals WHERE goalID = ?", [goalID]);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    getGoals,
    getGoal,
    insertGoal,
    updateGoal,
    deleteGoal
}