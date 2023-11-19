const { getAllCategories, getCategoryById } = require('../services/mealCategoriesService');

/**
 * Controller to retrieve all meal categories.
 * This function handles the HTTP request and response for getting all meal categories.
 * It uses the `getAllCategories` service to retrieve the categories and send them in the response.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllCategoriesController = async (req, res) => {
    try {
        const result = await getAllCategories();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
};

/**
 * Controller to retrieve a specific meal category by its ID.
 * This function handles the HTTP request and response for getting a meal category by its ID.
 * It extracts the categoryId from the request body and uses the `getCategoryById` service to retrieve the category.
 * 
 * @param {Object} req - The request object containing categoryId.
 * @param {Object} res - The response object.
 */
const getCategoryByIdController = async (req, res) => {
    const { categoryId } = req.body;
    try {
        const result = await getCategoryById(categoryId);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
};

module.exports = {
    getAllCategoriesController,
    getCategoryByIdController
}