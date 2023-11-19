const { query } = require('../database/db');
const { addNotification } = require('../services/notificationService');
const moment = require('moment');
const socket = require('../socket');

const getAchievements = async (userID) => {
    try {
        let sql = "SELECT * FROM achievements WHERE userID=?";
        const achievements = await query(sql, [userID]);
        return achievements;
    } catch (error) {
        throw new Error(error);
    }
};

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

        const io = socket.getIO();
        io.to(`user_${achievement.userID}`).emit('new_notification', {
            content: notificationContent
        });

        let insertedAchievement = await query("SELECT * FROM achievements WHERE userID=? ORDER BY achievementID DESC LIMIT 1", [achievement.userID]);
        return insertedAchievement;
    } catch (error) {
        throw new Error(error);
    }
};

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

module.exports = {
    getAchievements,
    addAchievement,
    checkForNewBadge
};
