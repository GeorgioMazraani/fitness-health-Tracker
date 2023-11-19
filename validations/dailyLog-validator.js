const { body, param } = require('express-validator');

const validateDailyLog = [
  body('userID').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be an integer'),
  body('date').notEmpty().withMessage('Log date is required').isISO8601().toDate().withMessage('Invalid date format'),
  body('totalCaloriesConsumed')
    .notEmpty().withMessage('Total calories consumed is required')
    .isInt({ min: 0, max: 10000 }).withMessage('Total calories consumed must be between 0 and 10000'),
  body('totalCaloriesBurned')
    .notEmpty().withMessage('Total calories burned is required')
    .isInt({ min: 0, max: 4000 }).withMessage('Total calories burned must be between 0 and 4000'),
  body('summary').optional().isString().withMessage('Summary must be a string')
];

const validateDeleteDailyLog = [
  param('logID')
    .notEmpty().withMessage('Log ID is required')
    .isInt().withMessage('Log ID must be an integer')
];

module.exports = {
  validateDailyLog,
  validateDeleteDailyLog
};
