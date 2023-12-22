// Importing required modules and controllers
const express = require('express');
const {
    getDailyLogsController,
    getDailyLogController,
    saveDailyLogController,
    deleteDailyLogController
} = require('../controllers/dailyLogsController');
const { validateDailyLog, validateDeleteDailyLog } = require('../validations/dailyLog-validator');
const router = express.Router();

// Route to get all daily logs for a user
router.get('/dailylogs/:userID', getDailyLogsController);

// Route to get a specific daily log
router.get('/dailylog', getDailyLogController);

// Route to save a new daily log
router.post('/dailylog', validateDailyLog, saveDailyLogController);

// Route to delete a daily log
router.delete('/dailylog', validateDeleteDailyLog, deleteDailyLogController);

// Exporting the router
module.exports = router;
