const { getRecipes, getRecipe, insertRecipe, updateRecipe, deleteRecipe,fetchRecipeData } = require('../services/recipeService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve recipes by category ID.
 * This function handles the HTTP request and response for getting recipes associated with a specific category.
 * It extracts the categoryID from the request body and uses the `getRecipes` service to retrieve the recipes.
 * 
 * @param {Object} req - The request object, containing the categoryID.
 * @param {Object} res - The response object.
 */
const getRecipesController = async (req, res) => {
    // Assuming you're using mealName as a query parameter
    const mealName = req.query.mealName;
    try {
        // getRecipes should be a function that fetches recipes based on the meal name or category
        const recipes = await getRecipes(mealName);

        // Render the 'recipes.ejs' template and pass the recipes data to it
        res.render('recipes', { recipes });
    } catch (error) {
        // Render an error page or pass the error to a global error handler
        res.status(500).render('error', { message: error.message });
    }
};


/**
 * Controller to retrieve a specific recipe by its ID.
 * This function handles the HTTP request and response for getting a specific recipe.
 * It extracts the recipeID from the request body and uses the `getRecipe` service to retrieve the recipe.
 * 
 * @param {Object} req - The request object containing recipeID.
 * @param {Object} res - The response object.
 */
const getRecipeController = async (req, res) => {
    const { recipeID } = req.body;
    try {
        const recipeByID = await getRecipe(recipeID);
        res.status(200).json({ recipes: recipeByID });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to insert a new recipe.
 * This function handles the HTTP request and response for adding a new recipe.
 * It performs validation checks on the request and uses the `insertRecipe` service to store the recipe.
 * 
 * @param {Object} req - The request object containing recipe details.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to update an existing recipe.
 * This function handles the HTTP request and response for updating a recipe's details.
 * It performs validation checks on the request and uses the `updateRecipe` service to update the recipe.
 * 
 * @param {Object} req - The request object containing updated recipe details.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to delete a recipe.
 * This function handles the HTTP request and response for deleting a recipe.
 * It extracts the recipeID from the request body and uses the `deleteRecipe` service to delete the recipe.
 * 
 * @param {Object} req - The request object containing recipeID.
 * @param {Object} res - The response object.
 */
const deleteRecipeController = async (req, res) => {
    const { recipeID } = req.body.recipeID;
    try {
        const deletedRecipe = await deleteRecipe(recipeID);
        res.status(200).json({ deletedRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const fetchRecipesController = async (req, res) => {
    const mealName = req.query.mealName;

    try {
        const recipes = await fetchRecipeData(mealName);
        res.json({ recipes });
    } catch (error) {
        console.error('Error in fetchRecipesController:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getRecipesController,
    getRecipeController,
    insertRecipeController,
    updateRecipeController,
    deleteRecipeController,
    fetchRecipesController
};

