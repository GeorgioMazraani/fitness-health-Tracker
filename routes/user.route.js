// Importing required modules and controllers
const express = require('express');
const {
    getAllUsersController,
    getUserController,
    insertUserController,
    updateUserController,
    deleteUserController,
    getUserDetailsWithMostBadgesController,
    renderLogin,
    loginUserController,
    renderRegister,
    searchUsersController,
    getUserProfileController,
    renderUpdate,
    logoutController
} = require('../controllers/userController');
const { insertUserValidation, updateUserValidation } = require('../validations/user-validator');
const router = express.Router();

// Route to get all users
router.get('/users', getAllUsersController);

// Route to get a specific user
router.get('/user', getUserController);

// Route to insert a new user
router.post('/register', insertUserValidation, insertUserController);

router.get('/updateProfile/:userID', renderUpdate);

// Route to update a user
router.post('/updateProfile/:userID', updateUserValidation, updateUserController);


// Route to delete a user
router.delete('/user', deleteUserController);

router.get('/userBadges', getUserDetailsWithMostBadgesController);

router.get('/login', renderLogin);

router.get('/register', renderRegister);

router.post('/login', loginUserController);

router.get('/search', searchUsersController);

router.get('/userProfile/:userID', getUserProfileController);

router.post('/logout', logoutController);


// Exporting the router
module.exports = router;
