const { getFeedback, submitFeedback, deleteFeedback } = require('../services/feedbackService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve feedback for a user.
 * This function handles the HTTP request and response for getting feedback associated with a user.
 * It extracts the userID from the request body and uses the `getFeedback` service to retrieve the feedback.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
const getFeedbackController = async (req, res) => {
    const { userID } = req.params;  // Assuming you're getting userID from route parameters
    try {
        const feedback = await getFeedback(userID);

        // Render the feedback.ejs view and pass the feedback data to it
        res.render('feedback', { feedback: feedback, userID: userID });
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
};

/**
 * Controller to submit user feedback.
 * This function handles the HTTP request and response for submitting feedback by a user.
 * It performs validation checks on the request, extracts the feedback data from the request body, 
 * and uses the `submitFeedback` service to store the feedback.
 * 
 * @param {Object} req - The request object containing user feedback data.
 * @param {Object} res - The response object.
 */
const submitFeedbackController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userID, content } = req.body;
    const dateSubmitted = new Date().toISOString().split('T')[0]; 

    try {
        const feedbackData = {
            userID: userID,
            content: content,
            dateSubmitted: dateSubmitted
        };

        const insertedFeedback = await submitFeedback(feedbackData);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/**
 * Controller to delete user feedback.
 * This function handles the HTTP request and response for deleting a specific feedback.
 * It performs validation checks on the request, extracts the feedbackID from the request body,
 * and uses the `deleteFeedback` service to delete the feedback.
 * 
 * @param {Object} req - The request object containing the feedbackID.
 * @param {Object} res - The response object.
 */
const deleteFeedbackController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { feedbackID } = req.body;
    try {
        await deleteFeedback(feedbackID);
        res.redirect('feedback');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFeedbackController,
    submitFeedbackController,
    deleteFeedbackController
}