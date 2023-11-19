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
    const { userID } = req.body;
    try {
        const feedback = await getFeedback(userID);
        res.status(200).json({ feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    const userfeedback = req.body;
    try {
        const insertedFeedback = await submitFeedback(userfeedback);
        res.status(200).json({ insertedFeedback });
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
        const deletedFeedback = await deleteFeedback(feedbackID);
        res.status(200).json({ deletedFeedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFeedbackController,
    submitFeedbackController,
    deleteFeedbackController
}