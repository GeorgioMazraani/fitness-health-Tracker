const { query } = require('../database/db');

/**
 * Retrieves the settings for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object>} A promise that resolves to the user's settings.
 */
const getSettings = async (userID) => {
    try {
        let settingSql = 'SELECT * FROM usersettings WHERE userID=?';
        const settings = await query(settingSql, [userID]);
        return settings;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Saves or updates a user's settings in the database.
 * @param {Object} usersettings - The settings object containing userID, theme, and notificationsEnabled.
 * @returns {Promise<Object>} A promise that resolves to the updated or new settings.
 */
const saveSettings = async (usersettings) => {
    try {
        let existingSettingSql = 'SELECT * FROM usersettings WHERE userID = ?';
        const existingSettings = await query(existingSettingSql, [usersettings.userID]);

        if (existingSettings.length > 0) {
            let updateSql = 'UPDATE usersettings SET theme = ?, notificationsEnabled = ? WHERE userID = ?';
            await query(updateSql, [
                usersettings.theme,
                usersettings.notificationsEnabled,
                usersettings.userID
            ]);
        } else {
            let insertSql = 'INSERT INTO usersettings (userID, theme, notificationsEnabled) VALUES (?, ?, ?)';
            await query(insertSql, [
                usersettings.userID,
                usersettings.theme,
                usersettings.notificationsEnabled
            ]);
        }

        let insertedOrUpdatedSetting = await query(existingSettingSql, [usersettings.userID]);
        return insertedOrUpdatedSetting;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    getSettings,
    saveSettings
}