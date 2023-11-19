const { query } = require('../database/db');
const moment=require('moment');
const getGoals = async (userID) => {
    try {
        let sql = "SELECT * FROM goals where userID=?";
        const goals = await query(sql, [userID]);
        return goals;
    } catch (error) {
        throw new Error(error);
    }
}
const getGoal = async (goalID) => {
    try {
        let sql = "SELECT * from goals where goalID=?";
        const goal = await query(sql, [goalID]);
        return goal;
    } catch (error) {
        throw new Error(error);
    }
}
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

const deleteGoal=async(goalID)=>{
    goalID=parseInt(goalID,10);
    try{
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