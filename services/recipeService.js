const { query } = require('../database/db');
const axios = require('axios');
/**
 * Retrieves all recipes for a given category.
 * @param {number} categoryID - The unique identifier of the meal category.
 * @returns {Promise<Object[]>} A promise that resolves to an array of recipe objects.
 */
const getRecipes = async (mealName) => {
    try {
        let sql = "SELECT * FROM recipes where mealName=?";
        const recipes = await query(sql, [mealName]);
        return recipes;
    } catch (error) {
        throw new Error(error);
    }
};
const fetchRecipeData = async (mealName) => {
    try {
        console.log(`Fetching recipes for meal name: ${mealName}`); // Log the meal name
        const response = await axios.get(`https://api.calorieninjas.com/v1/recipe?query=${encodeURIComponent(mealName)}`, {
            headers: { 'X-Api-Key': 'uUN/Ixvc6cp5AniijyAgwA==vMOx9Xy8p2DTXZjd' } 
        });
        return response.data.items; 
    } catch (error) {
        console.error('Error in fetchRecipeData:', error);
        // Log more error details or handle specific error scenarios
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
        throw new Error(error.response ? error.response.data.error : error.message);
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
            INSERT INTO recipes (categoryID, mealName, ingredients, preparation, servingSize) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        await query(insertSql, [
            recipe.categoryID,
            recipe.mealName,
            recipe.ingredients,
            recipe.preparation,
            recipe.servingSize,

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
            UPDATE recipes SET mealName = ?, ingredients = ?, preparation = ?, servingSize = ?
             WHERE recipeID = ?`;
        await query(updateSql, [
            recipe.mealName,
            recipe.ingredients,
            recipe.preparation,
            recipe.servingSize,
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
    deleteRecipe,
    fetchRecipeData
}