const { body } = require('express-validator');

const validateGoal = [
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

    body('startDate')
        .notEmpty().withMessage('Start date is required')
        .isISO8601().toDate().withMessage('Invalid start date format'),

    body('endDate')
        .notEmpty().withMessage('End date is required')
        .isISO8601().toDate().withMessage('Invalid end date format')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    body('initialWeight')
        .notEmpty().withMessage('Initial weight is required')
        .isFloat({ min: 0 }).withMessage('Initial weight must be a positive number'),

    body('targetWeight')
        .notEmpty().withMessage('Target weight is required')
        .isFloat({ min: 0 }).withMessage('Target weight must be a positive number'),

    body('progress')
        .notEmpty().withMessage('Progress is required')
        .isFloat({ min: 0, max: 100 }).withMessage('Progress must be a number between 0 and 100'),
];

const validateGoalUpdate = [
    body('goalID')
        .notEmpty().withMessage('Goal ID is required')
        .isInt({ min: 1 }).withMessage('Goal ID must be a positive integer'),
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

    body('startDate')
        .notEmpty().withMessage('Start date is required')
        .isISO8601().toDate().withMessage('Invalid start date format'),

    body('endDate')
        .notEmpty().withMessage('End date is required')
        .isISO8601().toDate().withMessage('Invalid end date format')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),

    body('initialWeight')
        .notEmpty().withMessage('Initial weight is required')
        .isFloat({ min: 0 }).withMessage('Initial weight must be a positive number'),

    body('targetWeight')
        .notEmpty().withMessage('Target weight is required')
        .isFloat({ min: 0 }).withMessage('Target weight must be a positive number'),

    body('progress')
        .notEmpty().withMessage('Progress is required')
        .isFloat({ min: 0, max: 100 }).withMessage('Progress must be a number between 0 and 100'),
];

module.exports = {
    validateGoal,
    validateGoalUpdate
};
