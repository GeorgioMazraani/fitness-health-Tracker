const { query } = require('../database/db');

const getAllCategories = async () => {
    try {
        const sql = 'SELECT * FROM mealcategories';
        return await query(sql);
    }catch(error){
        throw new Error(error);
    }
    
};

const getCategoryById = async (categoryID) => {
    try {
        const sql = 'SELECT * FROM mealcategories WHERE categoryID = ?';
        const results = await query(sql, [categoryID]);
        return results;
    } catch (error) {
        throw new Error(error);
    }

};

module.exports={
    getAllCategories,
    getCategoryById
}
