const { query } = require('../database/db');
const moment = require('moment');
const { addAchievement, checkForNewBadge } = require('../services/achievementService');

/**
 * Retrieves all workout entries for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of workout objects.
 */
const getWorkouts = async (userID) => {
    try {
        let sql = "SELECT * FROM workouts WHERE userID=?";
        const workouts = await query(sql, [userID]);
        return workouts;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific workout by its ID.
 * @param {number} workoutID - The unique identifier of the workout.
 * @returns {Promise<Object>} A promise that resolves to a workout object.
 */
const getWorkout = async (workoutID) => {
    try {
        let sql = "SELECT * FROM workouts WHERE workoutID=?";
        const workout = await query(sql, [workoutID]);
        return workout;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new workout entry for a user and checks for any new achievements.
 * @param {Object} workout - The workout object containing userID, workoutName, workoutDate, duration, and caloriesBurned.
 * @returns {Promise<Object>} A promise that resolves to the newly inserted workout object.
 */
const insertWorkout = async (workout) => {
    try {
        let insertSql = `
            INSERT INTO workouts (userID, workoutName, workoutDate, duration, caloriesBurned) 
            VALUES (?, ?, ?, ?, ?)`;
        await query(insertSql, [
            workout.userID,
            workout.workoutName,
            moment(workout.workoutDate).format('YYYY-MM-DD'),
            workout.duration,
            workout.caloriesBurned
        ]);

        let newBadge = await checkForNewBadge(workout.userID);

        if (newBadge) {
            await addAchievement({
                userID: workout.userID,
                badgeName: newBadge,
                dateEarned: new Date()
            });
        }

        let insertedWorkout = await query("SELECT * FROM workouts WHERE userID = ? ORDER BY workoutID DESC LIMIT 1", [workout.userID]);
        return insertedWorkout;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates an existing workout entry.
 * @param {Object} workout - The workout object containing workoutID, userID, workoutName, workoutDate, duration, and caloriesBurned.
 * @returns {Promise<void>} A promise that resolves when the workout is updated.
 */
const updateWorkout = async (workout) => {
    try {
        let updateSql = `
            UPDATE workouts SET workoutName = ?, workoutDate = ?, duration = ?, caloriesBurned = ?
            WHERE workoutID = ? AND userID = ?`;
        await query(updateSql, [
            workout.workoutName,
            moment(workout.workoutDate).format('YYYY-MM-DD'),
            workout.duration,
            workout.caloriesBurned,
            workout.workoutID,
            workout.userID
        ]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a workout entry based on the provided workoutID.
 * @param {number} workoutID - The unique identifier of the workout to be deleted.
 * @returns {Promise<void>} A promise that resolves when the workout is deleted.
 */
const deleteWorkout = async (workoutID) => {
    try {
        let deleteSql = "DELETE FROM workouts WHERE workoutID = ?";
        await query(deleteSql, [workoutID]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getWorkouts,
    getWorkout,
    insertWorkout,
    updateWorkout,
    deleteWorkout
};
