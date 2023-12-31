const { query } = require('../database/db');
const moment = require('moment');

/**
 * Retrieves all daily logs for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of daily log objects.
 */
const getDailyLogs = async (userID) => {
  try {
    const sql = "SELECT * FROM dailylogs WHERE userID = ?";
    const logs = await query(sql, [userID]);
    return logs;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific daily log by its ID.
 * @param {number} logID - The unique identifier of the daily log.
 * @returns {Promise<Object>} A promise that resolves to a daily log object.
 */
const getDailyLog = async (logID) => {
  try {
    const sql = "SELECT * FROM dailylogs WHERE logID = ?";
    const log = await query(sql, [logID]);
    return log;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Saves a daily log. If the logID is provided, it updates the existing log; otherwise, it creates a new log.
 * @param {Object} dailyLog - The daily log object containing userID, date, totalCaloriesConsumed, totalCaloriesBurned, and summary.
 * @returns {Promise<Object>} A promise that resolves to the saved daily log object.
 */
const saveDailyLog = async (dailyLog) => {
  try {
    if (dailyLog.logID) {
      // If logID exists, update the existing log
      const updateSql = `
          UPDATE dailylogs 
          SET logDate = ?, totalCaloriesConsumed = ?, totalCaloriesBurned = ?, summary = ?
          WHERE logID = ?`;
      await query(updateSql, [
        moment(dailyLog.date).format('YYYY-MM-DD'),
        dailyLog.totalCaloriesConsumed,
        dailyLog.totalCaloriesBurned,
        dailyLog.summary,
        dailyLog.logID
      ]);
      // Select and return the updated log
      const updatedLog = await query("SELECT * FROM dailylogs WHERE logID = ?", [dailyLog.logID]);
      return updatedLog;
    } else {
      // If logID does not exist, insert a new log
      const insertSql = `
          INSERT INTO dailylogs (userID, logDate, totalCaloriesConsumed, totalCaloriesBurned, summary) 
          VALUES (?, ?, ?, ?, ?)`;
      await query(insertSql, [
        dailyLog.userID,
        moment(dailyLog.date).format('YYYY-MM-DD'),
        dailyLog.totalCaloriesConsumed,
        dailyLog.totalCaloriesBurned,
        dailyLog.summary
      ]);
      // Select and return the newly inserted log
      const insertedLog = await query("SELECT * FROM dailylogs ORDER BY userID DESC LIMIT 1", [dailyLog.userID]);
      return insertedLog;
    }
  } catch (error) {
    // You should handle specific error cases separately for more granular error messages
    throw new Error(error);
  }
};

/**
 * Deletes a daily log by its ID.
 * @param {number} logID - The unique identifier of the daily log to be deleted.
 * @returns {Promise<void>}
 */
const deleteDailyLog = async (logID) => {
  try {
    const deleteSql = "DELETE FROM dailylogs WHERE logID = ?";
    await query(deleteSql, [logID]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getDailyLogs,
  getDailyLog,
  saveDailyLog,
  deleteDailyLog
};
