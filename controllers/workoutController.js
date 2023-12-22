const { getWorkouts, getWorkout, insertWorkout, updateWorkout, deleteWorkout } = require('../services/workoutService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve all workouts for a user.
 * This function handles the HTTP request and response for getting workouts associated with a user.
 * It extracts the userID from the request body and uses the `getWorkouts` service to retrieve the workouts.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
const getWorkoutsController = async (req, res) => {
    const userID = req.params.userID; 

    try {
        const workouts = await getWorkouts(userID);
        res.render('workout', { workouts, userID }); 
    } catch (error) {
        res.render('error', { message: error.message });
    }
};



/**
 * Controller to retrieve a specific workout by its ID.
 * This function handles the HTTP request and response for getting a specific workout.
 * It extracts the workoutID from the request body and uses the `getWorkout` service to retrieve the workout.
 * 
 * @param {Object} req - The request object containing workoutID.
 * @param {Object} res - The response object.
 */
const getWorkoutController = async (req, res) => {
    const { workoutID } = req.body;
    try {
        const workout = await getWorkout(workoutID);
        res.status(200).json({ workout });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to insert a new workout.
 * This function handles the HTTP request and response for adding a new workout.
 * It performs validation checks on the request, extracts the workout details from the request body, 
 * and uses the `insertWorkout` service to store the new workout.
 * 
 * @param {Object} req - The request object containing workout details.
 * @param {Object} res - The response object.
 */
// In insertWorkoutController
const insertWorkoutController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       
        return res.status(400).json({ errors: errors.array() });
    }
    const{userID}=req.body;
    const { workoutName, workoutDate, duration, caloriesBurned } = req.body;

    if (!userID || !workoutName || !workoutDate || !duration || !caloriesBurned) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newWorkout = await insertWorkout(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



/**
 * Controller to update an existing workout.
 * This function handles the HTTP request and response for updating a workout's details.
 * It performs validation checks on the request, extracts the updated workout details from the request body, 
 * and uses the `updateWorkout` service to update the workout.
 * 
 * @param {Object} req - The request object containing updated workout details.
 * @param {Object} res - The response object.
 */
const updateWorkoutController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const workout = req.body;
    try {
        const updatedWorkout = await updateWorkout(workout);
        res.status(200).json({ updatedWorkout });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to delete a workout.
 * This function handles the HTTP request and response for deleting a workout.
 * It extracts the workoutID from the request body and uses the `deleteWorkout` service to delete the workout.
 * 
 * @param {Object} req - The request object containing workoutID.
 * @param {Object} res - The response object.
 */
const deleteWorkoutController = async (req, res) => {
    const { workoutID } = req.body; 
    try {
        await deleteWorkout(workoutID);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWorkoutsController,
    getWorkoutController,
    insertWorkoutController,
    updateWorkoutController,
    deleteWorkoutController
};
