// Importing required modules and controllers
const express = require('express');
const {
    getWorkoutsController,
    getWorkoutController,
    insertWorkoutController,
    updateWorkoutController,
    deleteWorkoutController
} = require('../controllers/workoutController');
const { validateWorkout, validateWorkoutUpdate } = require('../validations/workout-validator');
const router = express.Router();

// Route to get all workouts
router.get('/workouts/:userID', getWorkoutsController);

// Route to get a specific workout
router.get('/workout', getWorkoutController);

// Route to insert a new workout
router.post('/userWorkout', validateWorkout, insertWorkoutController);

// Route to update a workout
router.put('/workout', validateWorkoutUpdate, updateWorkoutController);

// Route to delete a workout
router.delete('/workout', deleteWorkoutController);

// Exporting the router
module.exports = router;
