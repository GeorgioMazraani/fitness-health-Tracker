const { query } = require('../database/db');
const moment = require('moment');
const axios = require('axios');

/**
 * Retrieves all meal entries for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of meal objects.
 */
const getMeals = async (userID) => {
    try {
        let selectSql = `SELECT * FROM meals WHERE userID = ?`;
        const meals = await query(selectSql, [userID]);
        return meals;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific meal by its ID.
 * @param {number} mealID - The unique identifier of the meal.
 * @returns {Promise<Object>} A promise that resolves to a meal object.
 */
const getMeal = async (mealID) => {
    try {
        let selectSql = `SELECT * FROM meals WHERE mealID = ?`;
        const meal = await query(selectSql, [mealID]);
        return meal;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Saves a meal entry. If the meal entry exists, it updates; otherwise, it creates a new entry.
 * @param {Object} meal - The meal object containing userID, categoryID, mealName, mealDate, calories, proteins, carbs, and fats.
 * @returns {Promise<Object>} A promise that resolves to the saved meal object.
 */
const saveMeal = async (meal) => {
    try {
        let insertSql = `
            INSERT INTO meals (userID, categoryID, mealName, mealDate, calories, proteins, carbs, fats) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await query(insertSql, [
            meal.userID,
            meal.categoryID,
            meal.mealName,
            moment(meal.mealDate).format('YYYY-MM-DD'),
            meal.calories,
            meal.proteins,
            meal.carbs,
            meal.fats]);

        let insertedMeal = await query("SELECT * FROM meals WHERE userID = ? ORDER BY mealID DESC LIMIT 1", [meal.userID]);

        return insertedMeal;
    } catch (error) {
        throw new Error(error);
    }
};

const fetchNutritionData = async (mealName) => {
    try {
        const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${mealName}`, {
            headers: { 'X-Api-Key': 'uUN/Ixvc6cp5AniijyAgwA==vMOx9Xy8p2DTXZjd' }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

/**
 * Modifies an existing meal entry.
 * @param {Object} meal - The meal object containing mealID, userID, categoryID, mealName, mealDate, calories, proteins, carbs, and fats.
 * @returns {Promise<void>} A promise that resolves when the meal is updated.
 */
const modifyMeal = async (meal) => {
    try {
        let updateSql = `
            UPDATE meals SET categoryID = ?, mealName = ?, mealDate = ?, calories = ?, proteins = ?, carbs = ?, fats = ?
            WHERE mealID = ? AND userID = ?`;
        await query(updateSql,
            [meal.categoryID,
            meal.mealName,
            moment(meal.mealDate).format('YYYY-MM-DD'),
            meal.calories,
            meal.proteins,
            meal.carbs,
            meal.fats,
            meal.mealID,
            meal.userID]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a meal entry based on the provided mealID.
 * @param {number} mealID - The unique identifier of the meal to be deleted.
 * @returns {Promise<void>} A promise that resolves when the meal is deleted.
 */
const deleteMeal = async (mealID) => {
    mealID = parseInt(mealID, 10);
    try {
        return await query("DELETE FROM meals WHERE mealID = ?", [mealID]);
    } catch (error) {
        throw new Error(error);
    }
}

const deleteMealsForUser = async (userID) => {
    try {
        await query("DELETE FROM meals WHERE userID = ?", [userID]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getMeals,
    getMeal,
    saveMeal,
    modifyMeal,
    deleteMeal,
    deleteMealsForUser,
    fetchNutritionData
}
