const { query } = require('../database/db');

const getUsers = async () => {
    try {
        let sql = "select * from users";
        const users = await query(sql);
        return users;
    } catch (error) {
        throw new Error(error);
    }
}
const getUser = async (userID) => {
    try {
        let sql = `select * from users where userID=?`;
        const user = await query(sql, [userID]);
        return user;
    } catch (error) {
        throw new Error(error);
    }
}
const insertUser = async (Username, Password, Email, Age, Weight, Height, Gender, Goal) => {
    try {
        let insertSql = `
            INSERT INTO users (username, password, email, age, weight, height, gender, goal) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        await query(insertSql, [
            Username,
            Password,
            Email,
            Age,
            Weight,
            Height,
            Gender,
            Goal
        ]);

        // Retrieve the last inserted user
        let insertedUser = await query("SELECT * FROM users ORDER BY userID DESC LIMIT 1"); 
        return insertedUser;
    } catch (error) {
        throw new Error(error);
    }
};



const updateUser = async (userID, Username, Password, Email, Age, Weight, Height, gender, goal) => {
    try {
        let updateSql = `
            UPDATE users 
            SET 
                username = ?,
                password = ?,
                email = ?,
                age = ?,
                weight = ?,
                height = ?,
                gender = ?,
                goal = ?
            WHERE userID = ?`;

        await query(updateSql, [
            Username, // First set the Username
            Password, // Then Password
            Email,    // And so on...
            Age,
            Weight,
            Height,
            gender,
            goal,
            userID    // userID should be last to match the WHERE clause
        ]);
    } catch (error) {
        throw new Error(error);
    }
}

const deleteUser = async (userID) => {
    try {
        return await query(`Delete from users where userID=?`, [userID]);
    } catch (error) {
        throw new Error(error);
    }

}
module.exports = {
    getUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser,
}