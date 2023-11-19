const { body } = require('express-validator');

const validateMeal = [
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

    body('categoryID')
        .notEmpty().withMessage('Category ID is required')
        .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

    body('mealName')
        .notEmpty().withMessage('Meal name is required')
        .isString().withMessage('Meal name must be a string')
        .isLength({ min: 2 }).withMessage('Meal name must be at least 2 characters long'),

    body('mealDate')
        .notEmpty().withMessage('Meal date is required')
        .isISO8601().toDate().withMessage('Invalid date format'),

    body('calories')
        .notEmpty().withMessage('Calories are required')
        .isFloat({ min: 0 }).withMessage('Calories must be a positive number'),

    body('proteins')
        .notEmpty().withMessage('Proteins are required')
        .isFloat({ min: 0 }).withMessage('Proteins must be a positive number'),

    body('carbs')
        .notEmpty().withMessage('Carbohydrates are required')
        .isFloat({ min: 0 }).withMessage('Carbohydrates must be a positive number'),

    body('fats')
        .notEmpty().withMessage('Fats are required')
        .isFloat({ min: 0 }).withMessage('Fats must be a positive number'),
];

const validateMealModification = [
    body('mealID')
        .notEmpty().withMessage('Meal ID is required')
        .isInt({ min: 1 }).withMessage('Meal ID must be a positive integer'),
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

    body('categoryID')
        .notEmpty().withMessage('Category ID is required')
        .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

    body('mealName')
        .notEmpty().withMessage('Meal name is required')
        .isString().withMessage('Meal name must be a string')
        .isLength({ min: 2 }).withMessage('Meal name must be at least 2 characters long'),

    body('mealDate')
        .notEmpty().withMessage('Meal date is required')
        .isISO8601().toDate().withMessage('Invalid date format'),

    body('calories')
        .notEmpty().withMessage('Calories are required')
        .isFloat({ min: 0 }).withMessage('Calories must be a positive number'),

    body('proteins')
        .notEmpty().withMessage('Proteins are required')
        .isFloat({ min: 0 }).withMessage('Proteins must be a positive number'),

    body('carbs')
        .notEmpty().withMessage('Carbohydrates are required')
        .isFloat({ min: 0 }).withMessage('Carbohydrates must be a positive number'),

    body('fats')
        .notEmpty().withMessage('Fats are required')
        .isFloat({ min: 0 }).withMessage('Fats must be a positive number'),
];

module.exports = {
    validateMeal,
    validateMealModification
};
