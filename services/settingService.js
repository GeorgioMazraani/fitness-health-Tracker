const {query}=require('../database/db');

const getSettings=async(userID)=>{
    try{
        let settingSql='SELECT * FROM usersettings WHERE userID=?';
        const settings=await query(settingSql,[userID]);
        return settings;
    }catch(error){
        throw new Error(error);
    }
}

const saveSettings = async (usersettings) => {
    try {
        let existingSettingSql = 'SELECT * FROM usersettings WHERE userID = ?';
        const existingSettings = await query(existingSettingSql, [usersettings.userID]);

        if (existingSettings.length > 0) {
            // Update the existing user settings
            let updateSql = 'UPDATE usersettings SET theme = ?, notificationsEnabled = ? WHERE userID = ?';
            await query(updateSql, [
                usersettings.theme,
                usersettings.notificationsEnabled,
                usersettings.userID
            ]);
        } else {
            // Insert new user settings
            let insertSql = 'INSERT INTO usersettings (userID, theme, notificationsEnabled) VALUES (?, ?, ?)';
            await query(insertSql, [
                usersettings.userID,
                usersettings.theme,
                usersettings.notificationsEnabled
            ]);
        }

        // Return the updated or new settings
        let insertedOrUpdatedSetting = await query(existingSettingSql, [usersettings.userID]);
        return insertedOrUpdatedSetting;
    } catch (error) {
        // It's a good practice to log the error before throwing it
        console.error(error);
        throw new Error(error.message);
    }
};


module.exports={
    getSettings,
    saveSettings
}