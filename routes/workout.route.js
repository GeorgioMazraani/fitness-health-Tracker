const { getWorkoutsController, getWorkoutController, insertWorkoutController, updateWorkoutController, deleteWorkoutController } = require('../controllers/workoutController');
const express = require('express');
const router = express.Router();
const { validateWorkout, validateWorkoutUpdate } = require('../validations/workout-validator');

router.get('/workouts', getWorkoutsController);
router.get('/workout', getWorkoutController);
router.post('/workout', validateWorkout, insertWorkoutController);
router.put('/workout', validateWorkoutUpdate, updateWorkoutController);
router.delete('/workout', deleteWorkoutController);

module.exports = router;