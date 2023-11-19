const{getSettings,saveSettings}=require('../services/settingService');
const {validationResult}=require('express-validator');

const getSettingsController=async(req,res)=>{
    const {userID}=req.body;
    try{
        const settingsID=await getSettings(userID);
        res.status(200).json({ usersettings: settingsID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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


module.exports={
    getSettingsController,
    saveSettingsController
}