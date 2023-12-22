const { getUsers, insertUser, updateUser, deleteUser, getUser, getUserDetailsWithMostBadges, loginUser, searchUsersByUsername } = require(`../services/userService`);
const { getRelationshipStatus } = require('../services/friendService');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}


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
        const userID = await insertUser(username, password, email, age, weight, height, gender, goal);


        res.redirect(`/insertGoals/${userID}`);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};


// In userController.js or a similar file

const renderLogin = async (req, res) => {
    res.render('login');
};
const renderRegister = async (req, res) => {
    res.render('register');
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
    const { password, username, email, age, weight, height, gender, goal } = req.body;
    const userID = req.params.userID;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let updateParams = { username, email, age, weight, height, gender, goal };

    if (password && password.trim() !== '') {
        updateParams.password = await hashPassword(password);
    }

    try {
        await updateUser(userID, updateParams);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send(error.message);
    }
};


// In your userController.js
const renderUpdate = async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await getUser(userID);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user: user });
    } catch (error) {
        res.status(500).send(error.message);
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
const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await loginUser(email, password);
        if (user) {
            // If user is authenticated, save their information in the session
            req.session.user = { userID: user.userID, username: user.username };

            console.log("Session after login", req.session);

            res.redirect('/dashboard');
        } else {
            // If authentication fails, redirect back to the login page with an error
            res.redirect('/login?error=invalid_credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('An error occurred during login.');
    }
};

const searchUsersController = async (req, res) => {
    try {
        const searchTerm = req.query.username;
        if (!searchTerm) {
            return res.status(400).render('error', { message: "Search term is required." });
        }

        const users = await searchUsersByUsername(searchTerm);

        // Render the searchResults view with users data
        res.render('search', { users });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};
const getUserProfileController = async (req, res) => {
    try {
        const profileUserID = req.params.userID;
        const currentUserID = req.session.user.userID; 

        const user = await getUser(profileUserID);
        const relationshipStatus = await getRelationshipStatus(currentUserID, profileUserID);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('userProfile', {
            user: user,
            currentUserID: currentUserID, 
            profileUserID: profileUserID, 
            relationshipStatus: relationshipStatus
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const logoutController = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            res.status(500).send('An error occurred while logging out.');
        } else {
            res.clearCookie('connect.sid'); // Clears the session cookie
            res.redirect('/login');
        }
    });

};





module.exports = {
    getAllUsersController,
    getUserController,
    insertUserController,
    updateUserController,
    deleteUserController,
    getUserDetailsWithMostBadgesController,
    loginUserController,
    renderLogin,
    renderRegister,
    searchUsersController,
    getUserProfileController,
    renderUpdate,
    logoutController
}