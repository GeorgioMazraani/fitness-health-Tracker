const { body } = require('express-validator');

const insertUserValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .isStrongPassword()
    .withMessage('Password must be strong'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a valid number'),
  body('weight').optional().isFloat().withMessage('Weight must be a valid number'),
  body('height').optional().isFloat().withMessage('Height must be a valid number'),
  body('gender').optional().isIn(['Male', 'Female', 'other']).withMessage('Invalid gender'),
  body('goal').notEmpty().withMessage('Goal is required'),
];

const updateUserValidation = [
  body('username').optional().notEmpty().withMessage('Username cannot be empty'),
  body('password').optional().custom((value, { req }) => {
      if (value) {
          if (!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/) || value.length < 6) {
              throw new Error('Password must be at least 6 characters long and include lowercase, uppercase, numeric, and special characters');
          }
      }
      return true;
  }),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a valid number'),
  body('weight').optional().isFloat().withMessage('Weight must be a valid number'),
  body('height').optional().isFloat().withMessage('Height must be a valid number'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('goal').optional().notEmpty().withMessage('Goal cannot be empty'),
  // Ensure the userId is valid if it's provided
  body('userId').optional().isInt().withMessage('User ID must be a valid number'),
];

module.exports = {
  insertUserValidation,
  updateUserValidation,
};
