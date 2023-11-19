// Importing required modules and controllers
const express = require('express');
const { getFeedbackController, submitFeedbackController, deleteFeedbackController } = require('../controllers/feedbackController');
const router = express.Router();
const { validateSubmitFeedback, validateDeleteFeedback } = require('../validations/feedback-validator');

// Route to get feedback for a user
router.get('/feedback', getFeedbackController);

// Route to submit feedback
router.post('/feedback', validateSubmitFeedback, submitFeedbackController);

// Route to delete feedback
router.delete('/feedback', validateDeleteFeedback, deleteFeedbackController);

// Exporting the router
module.exports = router;
