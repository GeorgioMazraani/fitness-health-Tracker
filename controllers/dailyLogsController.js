const {
  getDailyLogs,
  getDailyLog,
  saveDailyLog,
  deleteDailyLog
} = require('../services/dailyLogsService');
const { validationResult } = require('express-validator');

/**
 * Controller for retrieving all daily logs of a user.
 * This function handles the HTTP request and response for getting all daily logs associated with a user.
 * It extracts the userID from the request body and uses the `getDailyLogs` service to retrieve the logs.
 * 
 * @param {Object} req - The HTTP request object, containing the userID in the body.
 * @param {Object} res - The HTTP response object used to return the logs or an error message.
 */
const getDailyLogsController = async (req, res) => {
  try {
    const { userID } = req.body; 
    const logs = await getDailyLogs(userID);
    res.json({ dailyLogs: logs });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Controller for retrieving a specific daily log.
 * This function handles the HTTP request and response for getting a specific daily log by its ID.
 * It extracts the logID from the request body and uses the `getDailyLog` service to retrieve the log.
 * 
 * @param {Object} req - The HTTP request object, containing the logID in the body.
 * @param {Object} res - The HTTP response object used to return the log or an error message.
 */
const getDailyLogController = async (req, res) => {
  try {
    const { logID } = req.body; 
    const log = await getDailyLog(logID);
    res.json({ dailyLog: log });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const saveDailyLogController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const dailyLog = req.body;
    await saveDailyLog(dailyLog);
    res.status(200).send('Daily log saved successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDailyLogController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { logID } = req.body;
    await deleteDailyLog(logID);
    res.status(200).send('Daily log deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDailyLogsController,
  getDailyLogController,
  saveDailyLogController,
  deleteDailyLogController
};
