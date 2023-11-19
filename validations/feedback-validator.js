const { body, param } = require('express-validator');

const validateSubmitFeedback = [
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),

    body('content')
        .notEmpty().withMessage('Feedback content is required')
        .isString().withMessage('Feedback content must be a string')
        .isLength({ min: 1 }).withMessage('Feedback content cannot be empty'),

    body('dateSubmitted')
        .optional()
        .isISO8601().toDate().withMessage('Invalid date format')
];

const validateDeleteFeedback = [
    param('feedbackID')
        .notEmpty().withMessage('Feedback ID is required')
        .isInt().withMessage('Feedback ID must be an integer')
];

module.exports = {
    validateSubmitFeedback,
    validateDeleteFeedback
};
