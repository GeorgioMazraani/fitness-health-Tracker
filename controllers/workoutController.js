const { getWorkouts, getWorkout, insertWorkout, updateWorkout, deleteWorkout } = require('../services/workoutService');
const { validationResult } = require('express-validator');

const getWorkoutsController = async (req, res) => {
    const { userID } = req.body;
    try {
        const workouts = await getWorkouts(userID);
        res.status(200).json({ workouts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkoutController = async (req, res) => {
    const { workoutID } = req.body;
    try {
        const workout = await getWorkout(workoutID);
        res.status(200).json({ workout });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const insertWorkoutController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const workout = req.body;
    try {
        const newWorkout = await insertWorkout(workout);
        res.status(200).json({ newWorkout });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

const deleteWorkoutController = async (req, res) => {
    const { workoutID } = req.body; // Assuming workoutID is in the body, but it could be in the params
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
