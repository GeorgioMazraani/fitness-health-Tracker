const { query } = require('../database/db');
const moment = require('moment');
const { addAchievement,checkForNewBadge } = require('../services/achievementService'); 
const getWorkouts = async (userID) => {
    try {
        let sql = "SELECT * FROM workouts WHERE userID=?";
        const workouts = await query(sql, [userID]);
        return workouts;
    } catch (error) {
        throw new Error(error);
    }
};

const getWorkout = async (workoutID) => {
    try {
        let sql = "SELECT * FROM workouts WHERE workoutID=?";
        const workout = await query(sql, [workoutID]);
        return workout;
    } catch (error) {
        throw new Error(error);
    }
};

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
