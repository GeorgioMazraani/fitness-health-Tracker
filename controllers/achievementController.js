const { getAchievements, addAchievement } = require('../services/achievementService');

/**
 * Controller for retrieving achievements of a user.
 * This function handles the HTTP request and response for getting user achievements.
 * It extracts the userID from the request body and uses the `getAchievements` service to retrieve the data.
 * 
 * @param {Object} req - The HTTP request object, containing the userID in the body.
 * @param {Object} res - The HTTP response object used to return the data or an error message.
 */
const getAchievementsController = async (req, res) => {
    const userID = req.params.userID; 
    try {
        const achievements = await getAchievements(userID);
        
        // Render the achievements view and pass the achievements data
        res.render('achievement', { achievements: achievements });
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
};

/**
 * Controller for adding a new achievement for a user.
 * This function handles the HTTP request and response for adding a new achievement.
 * It extracts the achievement details from the request body and uses the `addAchievement` service to add the achievement.
 * 
 * @param {Object} req - The HTTP request object, containing the achievement details in the body.
 * @param {Object} res - The HTTP response object used to return the added achievement data or an error message.
 */
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
