const { query } = require('../database/db');
const {getUserWithMostBadges} =require('./achievementService');
const bcrypt = require('bcrypt');

const loginUser = async (email, password) => {
    try {
        let sql = `SELECT * FROM users WHERE email = ?`;
        const users = await query(sql, [email]);

        if (users.length === 0) {
            throw new Error('User not found.');
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        return user; 
    } catch (error) {
        throw new Error(error.message);
    }
};


/**
 * Retrieves all users.
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 */
const getUsers = async () => {
    try {
        let sql = "select * from users";
        const users = await query(sql);
        return users;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a specific user by their userID.
 * @param {number} userID - The unique identifier of the user.
 * @returns {Promise<Object>} A promise that resolves to a user object.
 */
const getUser = async (userID) => {
    try {
        let sql = `SELECT * FROM users WHERE userID = ?`;
        const users = await query(sql, [userID]);
        return users[0]; 
    } catch (error) {
        throw new Error(error);
    }
};


const searchUsersByUsername = async (searchTerm) => {
    try {
        let sql = "SELECT userID, username FROM users WHERE username LIKE ?";
      
        const users = await query(sql, [`%${searchTerm}%`]);
        return users;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Inserts a new user into the database.
 * @param {String} Username, Password, Email, Age, Weight, Height, Gender, Goal - The user's details.
 * @returns {Promise<Object>} A promise that resolves to the newly inserted user object.
 */

const saltRounds = 10; 

const insertUser = async (Username, Password, Email, Age, Weight, Height, Gender, Goal) => {
    try {
        
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        let insertSql = `
            INSERT INTO users (username, password, email, age, weight, height, gender, goal) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        await query(insertSql, [
            Username,
            hashedPassword, 
            Email,
            Age,
            Weight,
            Height,
            Gender,
            Goal
        ]);

        // Retrieve the last inserted user
        // let insertedUser = await query("SELECT * FROM users ORDER BY userID DESC LIMIT 1");
        // return insertedUser;
        let insertedUser = await query("SELECT LAST_INSERT_ID() as id"); 
        return insertedUser[0].id; 
    } catch (error) {
        throw new Error(error);
    }
};


/**
 * Updates an existing user's details.
 * @param {number} userID - The unique identifier of the user to be updated.
 * @param {String} Username, Password, Email, Age, Weight, Height, gender, goal - The new details for the user.
 * @returns {Promise<void>} A promise that resolves when the user is updated.
 */
const updateUser = async (userID, updateParams) => {
    try {
        let updateSql = 'UPDATE users SET ';
        let queryParams = [];

        for (const [key, value] of Object.entries(updateParams)) {
            if (value !== undefined) {
                updateSql += `${key} = ?, `;
                queryParams.push(value);
            }
        }

        if (queryParams.length > 0) {
            updateSql = updateSql.slice(0, -2);
            updateSql += ` WHERE userID = ?`;
            queryParams.push(userID);

            await query(updateSql, queryParams);
        } else {
            throw new Error('No update fields provided');
        }
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw new Error(error.message);
    }
};

/**
 * Deletes a user from the database.
 * @param {number} userID - The unique identifier of the user to be deleted.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
const deleteUser = async (userID) => {
    try {
        return await query(`Delete from users where userID=?`, [userID]);
    } catch (error) {
        throw new Error(error);
    }

};

const getUserDetailsWithMostBadges = async () => {
    try {
        const userWithMostBadges = await getUserWithMostBadges();
        if (userWithMostBadges) {
            const userID = userWithMostBadges.userID;
            let userDetailsSql = "SELECT * FROM users WHERE userID=?";
            const userDetails = await query(userDetailsSql, [userID]);

            if (userDetails.length > 0) {
                return userDetails[0]; 
            }
        }
        return null; 
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser,
    getUserDetailsWithMostBadges,
    loginUser,
    searchUsersByUsername
}