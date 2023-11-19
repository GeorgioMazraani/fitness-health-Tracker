// Importing required modules and controllers
const express = require('express');
const {
    getAllUsersController,
    getUserController,
    insertUserController,
    updateUserController,
    deleteUserController
} = require('../controllers/userController');
const { insertUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();

// Route to get all users
router.get('/users', getAllUsersController);

// Route to get a specific user
router.get('/user', getUserController);

// Route to insert a new user
router.post('/user', insertUserValidation, insertUserController);

// Route to update a user
router.put('/user', updateUserValidation, updateUserController);

// Route to delete a user
router.delete('/user', deleteUserController);

// Exporting the router
module.exports = router;
