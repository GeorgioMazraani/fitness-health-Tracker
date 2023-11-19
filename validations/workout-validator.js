const { body } = require('express-validator');

const validateWorkout = [
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),

    body('workoutName')
        .notEmpty().withMessage('Workout name is required')
        .isLength({ min: 2 }).withMessage('Workout name must be at least 2 characters long'),

    body('workoutDate')
        .notEmpty().withMessage('Workout date is required')
        .isISO8601().toDate().withMessage('Invalid date format'),

    body('duration')
        .notEmpty().withMessage('Duration is required')
        .isFloat({ min: 0 }).withMessage('Duration must be a positive number'),

    body('caloriesBurned')
        .notEmpty().withMessage('Calories burned is required')
        .isInt({ min: 0, max: 2000 }).withMessage('Calories burned must be a positive integer and cannot be above 2000')
];

const validateWorkoutUpdate = [
    body('workoutID')
        .notEmpty().withMessage('Workout ID is required')
        .isInt().withMessage('Workout ID must be an integer'),
    body('userID')
        .notEmpty().withMessage('User ID is required')
        .isInt().withMessage('User ID must be an integer'),

    body('workoutName')
        .notEmpty().withMessage('Workout name is required')
        .isLength({ min: 2 }).withMessage('Workout name must be at least 2 characters long'),

    body('workoutDate')
        .notEmpty().withMessage('Workout date is required')
        .isISO8601().toDate().withMessage('Invalid date format'),

    body('duration')
        .notEmpty().withMessage('Duration is required')
        .isFloat({ min: 0 }).withMessage('Duration must be a positive number'),

    body('caloriesBurned')
        .notEmpty().withMessage('Calories burned is required')
        .isInt({ min: 0, max: 2000 }).withMessage('Calories burned must be a positive integer and cannot be above 2000')
];

module.exports = {
    validateWorkout,
    validateWorkoutUpdate
};
