const express = require('express');
const { getMealsController, getMealController, saveMealController, modifyMealController, deleteMealController } = require('../controllers/mealController');
const router = express.Router();
const { validateMeal, validateMealModification } = require('../validations/meal-validator');

router.get('/meals', getMealsController);
router.get('/meal', getMealController);
router.post('/meal', validateMeal, saveMealController);
router.put('/meal', validateMealModification, modifyMealController);
router.delete('/meal', deleteMealController);

module.exports = router;
