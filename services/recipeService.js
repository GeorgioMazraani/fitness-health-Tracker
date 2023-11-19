const { query } = require('../database/db');

const getRecipes = async (categoryID) => {
    try {
        let sql = "SELECT * FROM recipes where categoryID=?";
        const recipes = await query(sql, [categoryID]);
        return recipes;
    } catch (error) {
        throw new Error(error);
    }
}
const getRecipe = async (recipeID) => {
    try {
        let sql = "SELECT * from recipes where recipeID=?";
        const recipe = await query(sql, [recipeID]);
        return recipe;
    } catch (error) {
        throw new Error(error);
    }
}
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

const deleteRecipe=async(recipeID)=>{
    recipeID=parseInt(recipeID,10);
    try{
        return await query("DELETE FROM recipes WHERE recipeID = ?", [recipeID]);
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    getRecipes,
    getRecipe,
    insertRecipe,
    updateRecipe,
    deleteRecipe
}