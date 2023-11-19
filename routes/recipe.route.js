const { getRecipesController, getRecipeController, insertRecipeController, updateRecipeController, deleteRecipeController } = require('../controllers/recipeController');
const express = require('express');
const router = express.Router();
const { validateRecipeInsert, validateRecipeUpdate } = require('../validations/recipe-validator');

router.get('/recipes', getRecipesController);
router.get('/recipe', getRecipeController);
router.post('/recipe', validateRecipeInsert, insertRecipeController);
router.put('/recipe', validateRecipeUpdate, updateRecipeController);
router.delete('/recipe', deleteRecipeController);

module.exports = router;