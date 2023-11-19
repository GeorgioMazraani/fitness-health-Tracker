const { getSettings, saveSettings } = require('../services/settingService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve settings for a user.
 * This function handles the HTTP request and response for getting the settings associated with a user.
 * It extracts the userID from the request body and uses the `getSettings` service to retrieve the settings.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
const getSettingsController = async (req, res) => {
    const { userID } = req.body;
    try {
        const settingsID = await getSettings(userID);
        res.status(200).json({ usersettings: settingsID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to save or update a user's settings.
 * This function handles the HTTP request and response for saving or updating user settings.
 * It performs validation checks on the request, extracts the user settings from the request body, 
 * and uses the `saveSettings` service to save or update the settings.
 * 
 * @param {Object} req - The request object containing user settings data.
 * @param {Object} res - The response object.
 */
const saveSettingsController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const usersettings = req.body;
    try {
        const savedSetting = await saveSettings(usersettings);
        res.status(200).json({ usersettings: savedSetting }); // Return the saved settings from the database
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSettingsController,
    saveSettingsController
}