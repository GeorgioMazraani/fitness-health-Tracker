const express = require('express');
const router = express.Router();
const { getDailyLogsController, getDailyLogController, saveDailyLogController, deleteDailyLogController } = require('../controllers/dailyLogsController');
const { validateDailyLog, validateDeleteDailyLog } = require('../validations/dailyLog-validator');

router.get('/dailylogs', getDailyLogsController);
router.get('/dailylog', getDailyLogController);
router.post('/dailylog', validateDailyLog, saveDailyLogController);
router.delete('/dailylog', validateDeleteDailyLog, deleteDailyLogController);

module.exports = router;