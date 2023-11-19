const { query } = require('../database/db');

/**
 * Retrieves all meal categories.
 * @returns {Promise<Object[]>} A promise that resolves to an array of meal category objects.
 */
const getAllCategories = async () => {
    try {
        const sql = 'SELECT * FROM mealcategories';
        return await query(sql);
    } catch (error) {
        throw new Error(error);
    }

};

/**
 * Retrieves a specific meal category by its ID.
 * @param {number} categoryID - The unique identifier of the meal category.
 * @returns {Promise<Object>} A promise that resolves to a meal category object.
 */
const getCategoryById = async (categoryID) => {
    try {
        const sql = 'SELECT * FROM mealcategories WHERE categoryID = ?';
        const results = await query(sql, [categoryID]);
        return results;
    } catch (error) {
        throw new Error(error);
    }

};

module.exports = {
    getAllCategories,
    getCategoryById
}
