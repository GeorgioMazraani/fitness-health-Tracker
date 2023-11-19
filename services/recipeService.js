const { query } = require('../database/db');

/**
 * Retrieves all recipes for a given category.
 * @param {number} categoryID - The unique identifier of the meal category.
 * @returns {Promise<Object[]>} A promise that resolves to an array of recipe objects.
 */
const getRecipes = async (categoryID) => {
    try {
        let sql = "SELECT * FROM recipes where categoryID=?";
        const recipes = await query(sql, [categoryID]);
        return recipes;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific recipe by its ID.
 * @param {number} recipeID - The unique identifier of the recipe.
 * @returns {Promise<Object>} A promise that resolves to a recipe object.
 */
const getRecipe = async (recipeID) => {
    try {
        let sql = "SELECT * from recipes where recipeID=?";
        const recipe = await query(sql, [recipeID]);
        return recipe;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new recipe into the database.
 * @param {Object} recipe - The recipe object containing categoryID, mealName, ingredients, preparation, servingSize, and caloriesPerServing.
 * @returns {Promise<Object>} A promise that resolves to the newly inserted recipe object.
 */
const insertRecipe = async (recipe) => {
    try {
        let insertSql = `
            INSERT INTO recipes (categoryID, mealName, ingredients, preparation, servingSize, caloriesPerServing) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        await query(insertSql, [
            recipe.categoryID,
            recipe.mealName,
            recipe.ingredients,
            recipe.preparation,
            recipe.servingSize,
            recipe.caloriesPerServing
        ]);
        let insertedRecipe = await query("SELECT * FROM recipes ORDER BY recipeID DESC LIMIT 1 ");

        return insertedRecipe;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates an existing recipe based on its ID.
 * @param {Object} recipe - The recipe object containing recipeID, mealName, ingredients, preparation, servingSize, and caloriesPerServing.
 * @returns {Promise<void>} A promise that resolves when the recipe is updated.
 */
const updateRecipe = async (recipe) => {
    try {
        let updateSql = `
            UPDATE recipes SET mealName = ?, ingredients = ?, preparation = ?, servingSize = ?, caloriesPerServing = ?
             WHERE recipeID = ?`;
        await query(updateSql, [
            recipe.mealName,
            recipe.ingredients,
            recipe.preparation,
            recipe.servingSize,
            recipe.caloriesPerServing,
            recipe.recipeID
        ]);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a recipe based on its ID.
 * @param {number} recipeID - The unique identifier of the recipe to be deleted.
 * @returns {Promise<void>} A promise that resolves when the recipe is deleted.
 */
const deleteRecipe = async (recipeID) => {
    recipeID = parseInt(recipeID, 10);
    try {
        return await query("DELETE FROM recipes WHERE recipeID = ?", [recipeID]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    insertRecipe,
    updateRecipe,
    deleteRecipe
}