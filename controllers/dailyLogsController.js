const {
  getDailyLogs,
  getDailyLog,
  saveDailyLog,
  deleteDailyLog
} = require('../services/dailyLogsService');
const { validationResult } = require('express-validator');

const getDailyLogsController = async (req, res) => {
  try {
    const { userID } = req.body; // Assuming userID is passed as a URL parameter
    const logs = await getDailyLogs(userID);
    res.json({ dailyLogs: logs });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDailyLogController = async (req, res) => {
  try {
    const { logID } = req.body; // Assuming logID is passed as a URL parameter
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
