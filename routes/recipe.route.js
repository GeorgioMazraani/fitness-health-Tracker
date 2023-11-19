// Importing required modules and controllers
const express = require('express');
const {
    getRecipesController,
    getRecipeController,
    insertRecipeController,
    updateRecipeController,
    deleteRecipeController
} = require('../controllers/recipeController');
const { validateRecipeInsert, validateRecipeUpdate } = require('../validations/recipe-validator');
const router = express.Router();

// Route to get all recipes
router.get('/recipes', getRecipesController);

// Route to get a specific recipe
router.get('/recipe', getRecipeController);

// Route to insert a new recipe
router.post('/recipe', validateRecipeInsert, insertRecipeController);

// Route to update a recipe
router.put('/recipe', validateRecipeUpdate, updateRecipeController);

// Route to delete a recipe
router.delete('/recipe', deleteRecipeController);

// Exporting the router
module.exports = router;
