const { getMeals, getMeal, saveMeal, modifyMeal, deleteMeal } = require('../services/mealService');
const { validationResult } = require('express-validator');

const getMealsController = async (req, res) => {
    const { userID } = req.body;
    try {
        const mealIDs = await getMeals(userID);
        res.status(200).json({ meals: mealIDs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMealController = async (req, res) => {
    const { mealID } = req.body;
    try {
        const mealById = await getMeal(mealID);
        res.status(200).json({ meal: mealById });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const saveMealController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const meal = req.body; // assuming meal contains all required fields
    try {
        const savedMeal = await saveMeal(meal);
        res.status(201).json({ meal: savedMeal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const modifyMealController = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const meal = req.body;
    try {
        const updatedMeal = await modifyMeal(meal);
        res.status(200).json({ updatedMeal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteMealController = async (req, res) => {
    const mealID = req.body.mealID;
    try {
        const deletedMeal = await deleteMeal(mealID);
        res.status(200).json({ deletedMeal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getMealsController,
    getMealController,
    saveMealController,
    modifyMealController,
    deleteMealController,

}