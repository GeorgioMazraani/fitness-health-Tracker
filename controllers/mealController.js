const { getMeals, getMeal,saveMeal, modifyMeal, deleteMeal, deleteMealsForUser,fetchNutritionData } = require('../services/mealService');
const { validationResult } = require('express-validator');

/**
 * Controller for retrieving all meals of a user.
 * This function handles the HTTP request and response for getting all meals associated with a user.
 * It extracts the userID from the request parameters and uses the `getAllMeals` service to retrieve the meals.
 * 
 * @param {Object} req - The HTTP request object, containing the userID in the params.
 * @param {Object} res - The HTTP response object used to return the meals or an error message.
 */
const getMealsController = async (req, res) => {
    const { userID } = req.params; 
    try {
        const mealsData = await getMeals(userID);
        res.render('meal', { meals: mealsData, userID: userID }); 
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};



/**
 * Controller for retrieving a specific meal.
 * This function handles the HTTP request and response for getting a specific meal by its ID.
 * It extracts the mealID from the request parameters and uses the `getMeal` service to retrieve the meal.
 * 
 * @param {Object} req - The HTTP request object, containing the mealID in the params.
 * @param {Object} res - The HTTP response object used to return the meal or an error message.
 */
const getMealController = async (req, res) => {
    const { mealID } = req.body;
    try {
        const mealById = await getMeal(mealID);
        res.status(200).json({ meal: mealById });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller for adding a meal.
 * This function handles the HTTP request and response for adding a meal.
 * It extracts the meal details from the request body and uses the `saveMeal` service to save the meal.
 * 
 * @param {Object} req - The HTTP request object, containing the meal details in the body.
 * @param {Object} res - The HTTP response object used to confirm the addition or return an error message.
 */
const saveMealController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
       console.log(req.body);

       const result = await saveMeal(req.body);

       // If the insert function returns a result, use that to determine if the operation was successful
       if (result) {
           res.status(201).json({ message: 'Meal added successfully', data: result });
       } else {
           // If the result is falsy, respond with an error
           res.status(500).json({ message: 'Failed to add the meal' });
       }
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Server error while adding meal', error: error.message });
   }
};

/**
 * Controller for updating a meal.
 * This function handles the HTTP request and response for updating a meal's details.
 * It extracts the mealID and updated details from the request body and uses the `modifyMeal` service to update the meal.
 * 
 * @param {Object} req - The HTTP request object, containing the mealID and updated details in the body.
 * @param {Object} res - The HTTP response object used to confirm the update or return an error message.
 */
const modifyMealController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const meal = req.body;
    try {
        const updatedMeal = await modifyMeal(meal);
        res.status(200).json({ updatedMeal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller for deleting a meal.
 * This function handles the HTTP request and response for deleting a meal by its ID.
 * It extracts the mealID from the request parameters and uses the `deleteMeal` service to delete the meal.
 * 
 * @param {Object} req - The HTTP request object, containing the mealID in the params.
 * @param {Object} res - The HTTP response object used to confirm the deletion or return an error message.
 */
const deleteMealController = async (req, res) => {
    const mealID = req.body.mealID;
    try {
        const deletedMeal = await deleteMeal(mealID);
        res.status(200).json({ deletedMeal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const resetMealsController = async (req, res) => {
    try {
      
        await deleteMealsForUser(req.body.userID);
        res.redirect('/meals'); // Redirect back to the meals page
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMealsForAllUsers = async () => {
    try {
        await query("DELETE FROM meals");
    } catch (error) {
        throw new Error(error);
    }
};
const searchMealController = async (req, res) => {
    try {
        const mealName = req.query.mealName;
        const mealData = await fetchNutritionData(mealName);
        res.json(mealData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching meal data." });
    }
};



module.exports = {
    getMealsController,
    getMealController,
    saveMealController,
    modifyMealController,
    deleteMealController,
    resetMealsController,
    deleteMealsForAllUsers,
    searchMealController

}