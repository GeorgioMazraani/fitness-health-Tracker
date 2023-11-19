// Importing required modules and controllers
const express = require('express');
const {
    getMealsController,
    getMealController,
    saveMealController,
    modifyMealController,
    deleteMealController
} = require('../controllers/mealController');
const { validateMeal, validateMealModification } = require('../validations/meal-validator');
const router = express.Router();

// Route to get all meals
router.get('/meals', getMealsController);

// Route to get a specific meal
router.get('/meal', getMealController);

// Route to save a new meal
router.post('/meal', validateMeal, saveMealController);

// Route to modify an existing meal
router.put('/meal', validateMealModification, modifyMealController);

// Route to delete a meal
router.delete('/meal', deleteMealController);

// Exporting the router
module.exports = router;
