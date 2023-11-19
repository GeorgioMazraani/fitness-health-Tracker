const { getFeedback, submitFeedback, deleteFeedback } = require('../services/feedbackService');
const { validationResult } = require('express-validator');

const getFeedbackController = async (req, res) => {
    const { userID } = req.body;
    try {
        const feedback = await getFeedback(userID);
        res.status(200).json({ feedback });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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
}
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
}

module.exports = {
    getFeedbackController,
    submitFeedbackController,
    deleteFeedbackController
}