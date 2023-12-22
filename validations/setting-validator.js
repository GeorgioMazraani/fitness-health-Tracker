const { body } = require('express-validator');

const saveSettingsValidation = [
  body('userID')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  body('theme')
    .notEmpty().withMessage('Theme is required')
    .isIn(['Light', 'Dark']).withMessage('Invalid theme value. Theme must be "Light" or "Dark".'),

    body('notificationsEnabled')
    .custom(value => value === '1' || value === undefined)
    .withMessage('Invalid notificationsEnabled value. It must be "1" or "0".')
    .toBoolean()

];

module.exports = {
  saveSettingsValidation
};
