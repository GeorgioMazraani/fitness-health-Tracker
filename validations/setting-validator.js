const { body } = require('express-validator');

const saveSettingsValidation = [
  body('userID')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  body('theme')
    .notEmpty().withMessage('Theme is required')
    .isIn(['Light', 'Dark']).withMessage('Invalid theme value. Theme must be "Light" or "Dark".'),

  body('notificationsEnabled')
    .notEmpty().withMessage('notificationsEnabled is required')
    .isBoolean().withMessage('Invalid notificationsEnabled value. It must be true or false.')
    .toBoolean() // This will convert the value to a Boolean true or false
];

module.exports = {
  saveSettingsValidation
};
