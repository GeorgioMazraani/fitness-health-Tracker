const { getUsers, insertUser, updateUser, deleteUser, getUser } = require(`../services/userService`);
const {validationResult}=require('express-validator');

const getAllUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
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
}

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
}


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
}

module.exports = {
    getAllUsersController,
    getUserController,
    insertUserController,
    updateUserController,
    deleteUserController,
}