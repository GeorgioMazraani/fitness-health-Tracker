const { query } = require('../database/db');
const moment = require('moment');

const getMeals = async (userID) => {
    try {
        let selectSql = `SELECT * FROM meals WHERE userID = ?`;
        const meals = await query(selectSql, [userID]);
        return meals;
    } catch (error) {
        throw new Error(error);
    }
};

const getMeal = async (mealID) => {
    try {
        let selectSql = `SELECT * FROM meals WHERE mealID = ?`;
        const meal = await query(selectSql, [mealID]);
        return meal;
    } catch (error) {
        throw new Error(error);
    }
};

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

        // Retrieve the last inserted meal for the given userID
        // Correctly reference meal.userID instead of a non-existent userID variable
        let insertedMeal = await query("SELECT * FROM meals WHERE userID = ? ORDER BY mealID DESC LIMIT 1", [meal.userID]);

        return insertedMeal;
    } catch (error) {
        throw new Error(error);
    }
};

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
const deleteMeal = async (mealID) => {
    mealID = parseInt(mealID, 10);
    try {
        return await query("DELETE FROM meals WHERE mealID = ?", [mealID]);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    getMeals,
    getMeal,
    saveMeal,
    modifyMeal,
    deleteMeal,
}
