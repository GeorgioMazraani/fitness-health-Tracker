// Importing required modules and controllers
const express = require('express');
const {
    getAllCategoriesController,
    getCategoryByIdController
} = require('../controllers/mealCategoriesController');
const router = express.Router();

// Route to get all meal categories
router.get('/categories', getAllCategoriesController);

// Route to get a specific meal category by ID
router.get('/category', getCategoryByIdController);

// Exporting the router
module.exports = router;
