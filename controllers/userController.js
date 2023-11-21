const { getUsers, insertUser, updateUser, deleteUser, getUser, getUserDetailsWithMostBadges } = require(`../services/userService`);
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve all users.
 * Handles the HTTP request and response for getting all users.
 * Uses the `getUsers` service to retrieve the user data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
};

/**
 * Controller to retrieve a specific user by their userID.
 * Handles the HTTP request and response for getting a specific user.
 * Extracts the userID from the request body and uses the `getUser` service.
 * 
 * @param {Object} req - The request object containing the userID.
 * @param {Object} res - The response object.
 */
const getUserController = async (req, res) => {
    const { userID } = req.body;
    if (!userID) {
        return res.status(400).json({ message: "missing user id" });
    }
    try {
        const result = await getUser(userID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

/**
 * Controller to insert a new user.
 * Handles the HTTP request and response for adding a new user.
 * Performs validation checks, extracts user details from the request body, 
 * and uses the `insertUser` service to add the user.
 * 
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object.
 */
const insertUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email, age, weight, height, gender, goal } = req.body;

    try {
        const response = await insertUser(username, password, email, age, weight, height, gender, goal);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

/**
 * Controller to update an existing user's details.
 * Handles the HTTP request and response for updating a user.
 * Performs validation checks, extracts updated user details from the request body, 
 * and uses the `updateUser` service to update the user.
 * 
 * @param {Object} req - The request object containing updated user details.
 * @param {Object} res - The response object.
 */
const updateUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID, username, password, email, age, weight, height, gender, goal } = req.body;
    if (!userID) {
        return res.status(400).json({ message: "missing user id" });
    }
    try {
        const response = await updateUser(userID, username, password, email, age, weight, height, gender, goal);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

/**
 * Controller to delete a user.
 * Handles the HTTP request and response for deleting a user.
 * Extracts the userID from the request body and uses the `deleteUser` service.
 * 
 * @param {Object} req - The request object containing the userID.
 * @param {Object} res - The response object.
 */
const deleteUserController = async (req, res) => {
    const { userID } = req.body;
    if (!userID) {
        return res.status(400).json({ message: "missing user id" });
    }

    try {
        const result = await deleteUser(userID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getUserDetailsWithMostBadgesController = async (req, res) => {
    try {
        const userDetails = await getUserDetailsWithMostBadges();
        if (userDetails) {
            res.status(200).json({ userDetails });
        } else {
            res.status(404).json({ message: "No user found with most badges" });
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};


module.exports = {
    getAllUsersController,
    getUserController,
    insertUserController,
    updateUserController,
    deleteUserController,
    getUserDetailsWithMostBadgesController
}