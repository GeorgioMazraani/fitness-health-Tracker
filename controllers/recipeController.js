const { getRecipes, getRecipe, insertRecipe, updateRecipe, deleteRecipe } = require('../services/recipeService');
const { validationResult } = require('express-validator');
const getRecipesController = async (req, res) => {
    const { categoryID } = req.body;
    try {
        const recipeByCatID = await getRecipes(categoryID);
        res.status(200).json({ recipes: recipeByCatID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getRecipeController = async (req, res) => {
    const { recipeID } = req.body;
    try {
        const recipeByID = await getRecipe(recipeID);
        res.status(200).json({ recipes: recipeByID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const insertRecipeController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const recipe = req.body;
    try {
        const insertedRecipe = await insertRecipe(recipe);
        res.status(200).json({ insertedRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateRecipeController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const recipe = req.body;
    try {
        const updatedRecipe = await updateRecipe(recipe);
        res.status(200).json({ updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteRecipeController = async (req, res) => {
    const { recipeID } = req.body.recipeID;
    try {
        const deletedRecipe = await deleteRecipe(recipeID);
        res.status(200).json({ deletedRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getRecipesController,
    getRecipeController,
    insertRecipeController,
    updateRecipeController,
    deleteRecipeController
};

