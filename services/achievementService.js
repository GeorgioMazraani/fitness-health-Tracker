const { query } = require('../database/db');
const { addNotification } = require('../services/notificationService');
const moment = require('moment');

/**
 * Retrieves all achievements for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of achievement objects.
 */
const getAchievements = async (userID) => {
    try {
        let sql = "SELECT * FROM achievements WHERE userID=?";
        const achievements = await query(sql, [userID]);
        return achievements;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds a new achievement for a user and notifies them.
 * @param {Object} achievement - The achievement object containing userID, badgeName, and dateEarned.
 * @returns {Promise<Object>} A promise that resolves to the newly added achievement object.
 */
const addAchievement = async (achievement) => {
    try {
        let insertSql = `
            INSERT INTO achievements (userID, badgeName, dateEarned) 
            VALUES (?, ?, ?)`;
        await query(insertSql, [
            achievement.userID,
            achievement.badgeName,
            moment(achievement.dateEarned).format('YYYY-MM-DD')
        ]);

        let notificationContent = `Congratulations! You've earned the ${achievement.badgeName} badge!`;
        await addNotification({
            userID: achievement.userID,
            content: notificationContent,
            dateCreated: new Date()
        });

        let insertedAchievement = await query("SELECT * FROM achievements WHERE userID=? ORDER BY achievementID DESC LIMIT 1", [achievement.userID]);
        return insertedAchievement;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Checks for a new badge based on the count of workouts completed by the user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<string|null>} A promise that resolves to the name of the new badge earned, or null if no new badge is earned.
 */
const checkForNewBadge = async (userID) => {
    try {
        let countSql = "SELECT COUNT(*) as workoutCount FROM workouts WHERE userID=?";
        let result = await query(countSql, [userID]);

        if (result.length > 0) {
            let workoutCount = result[0].workoutCount;

            if (workoutCount === 1) {
                return "First Workout";
            } else if (workoutCount === 6) {
                return "One Week";
            } else if (workoutCount === 24) { // 6 workouts * 4 weeks
                return "One Month";
            }
            else if (workoutCount === 72) {
                return "Three Months";
            } else if (workoutCount === 144) {
                return "Six Months";
            } else if (workoutCount === 288) {
                return "One Year";
            }
        }

        return null; // No new badge earned
    } catch (error) {
        throw new Error(error);
    }
};
const getBadgesByUserID=async (userID)=>{
    let max=0;
    let countSql="SELECT COUNT(*) as badgesCount FROM achievements WHERE userID=?";
    let result= await query(countSql, [userID]);
    
};

const getUserWithMostBadges = async () => {
    try {
        let sql = `
            SELECT userID, COUNT(*) as badgeCount 
            FROM achievements 
            GROUP BY userID 
            ORDER BY badgeCount DESC 
            LIMIT 1`;

        const result = await query(sql);
        if (result.length > 0) {
            return result[0];
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getAchievements,
    addAchievement,
    checkForNewBadge,
    getUserWithMostBadges
};
