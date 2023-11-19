const { body } = require('express-validator');

const validateRecipeInsert = [
  body('categoryID')
    .notEmpty().withMessage('Category ID is required')
    .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

  body('mealName')
    .notEmpty().withMessage('Meal name is required')
    .isLength({ min: 2 }).withMessage('Meal name must be at least 2 characters long'),

  body('ingredients')
    .notEmpty().withMessage('Ingredients are required'),

  body('preparation')
    .notEmpty().withMessage('Preparation steps are required'),

  body('servingSize')
    .notEmpty().withMessage('Serving size is required')
    .isInt({ min: 1 }).withMessage('Serving size must be a positive integer'),

  body('caloriesPerServing')
    .notEmpty().withMessage('Calories per serving are required')
    .isFloat({ min: 0 }).withMessage('Calories per serving must be a positive number'),
];

const validateRecipeUpdate = [
  body('recipeID')
    .notEmpty().withMessage('Recipe ID is required')
    .isInt({ min: 1 }).withMessage('Recipe ID must be a positive integer'),
    body('categoryID')
    .notEmpty().withMessage('Category ID is required')
    .isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),

  body('mealName')
    .notEmpty().withMessage('Meal name is required')
    .isLength({ min: 2 }).withMessage('Meal name must be at least 2 characters long'),

  body('ingredients')
    .notEmpty().withMessage('Ingredients are required'),

  body('preparation')
    .notEmpty().withMessage('Preparation steps are required'),

  body('servingSize')
    .notEmpty().withMessage('Serving size is required')
    .isInt({ min: 1 }).withMessage('Serving size must be a positive integer'),

  body('caloriesPerServing')
    .notEmpty().withMessage('Calories per serving are required')
    .isFloat({ min: 0 }).withMessage('Calories per serving must be a positive number'),
];

module.exports = {
  validateRecipeInsert,
  validateRecipeUpdate
};
