// Importing required modules and controllers
const express = require('express');
const { getSettingsController, saveSettingsController } = require('../controllers/settingController');
const { saveSettingsValidation } = require('../validations/setting-validator');
const router = express.Router();

// Route to get settings for a user
router.get('/settings', getSettingsController);

// Route to save or update settings
router.post('/settings', saveSettingsValidation, saveSettingsController);

// Exporting the router
module.exports = router;
