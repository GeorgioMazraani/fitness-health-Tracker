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

    const userID = req.params.userID;

    try {

        const settings = await getSettings(userID);

        if (settings.length > 0) {
        

            res.render('settings', { userID: userID, settings: settings[0] });

        } else {
       
            res.render('settings', { settings: null, userID: userID });
        }
    } catch (error) {
        res.status(500).render('error', { message: error.message });
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
 
    req.body.notificationsEnabled = req.body.notificationsEnabled ? '1' : '0';
    console.log("Received data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await saveSettings(req.body); 
        res.redirect('/dashboard'); // Redirect to the dashboard after saving settings
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getSettingsController,
    saveSettingsController
}