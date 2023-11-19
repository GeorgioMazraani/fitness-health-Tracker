const { getAchievements, addAchievement } = require('../services/achievementService'); // adjust the path as needed

const getAchievementsController = async (req, res) => {
    const { userID } = req.body; 
    try {
        const userAchievements = await getAchievements(userID);
        res.status(200).json({ achievements: userAchievements });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAchievementController = async (req, res) => {
    const achievement = req.body;
    try {
        const newAchievement = await addAchievement(achievement);
        res.status(200).json({ achievement: newAchievement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAchievementsController,
    addAchievementController
};
