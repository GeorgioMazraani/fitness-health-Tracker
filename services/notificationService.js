const { query } = require('../database/db');
const moment = require('moment');

/**
 * Retrieves all notifications for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of notification objects.
 */
const getNotification = async (userID) => {
    try {
        let sql = 'select * from notifications where userID=?';
        const notification = await query(sql, [userID]);
        return notification;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds a new notification for a user.
 * @param {Object} notifications - The notification object containing userID, content, and dateCreated.
 * @returns {Promise<Object>} A promise that resolves to the newly added notification object.
 */
const addNotification = async (notifications) => {
    try {
        let insertSql = 'INSERT INTO notifications (userID,content,dateCreated) VALUES (?,?,?)';
        await query(insertSql, [
            notifications.userID,
            notifications.content,
            moment(notifications.dateCreated).format('YYYY-MM-DD')
        ]);
        let insertedNotification = await query('SELECT * FROM notifications where userID=? ORDER BY notificationID DESC LIMIT 1', [notifications.userID]);
        return insertedNotification;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Deletes a notification based on the provided notificationID.
 * @param {number} notificationID - The unique identifier of the notification to be deleted.
 * @returns {Promise<void>} A promise that resolves when the notification is deleted.
 */
const deleteNotification = async (notificationID) => {
    try {
        let sql = 'delete from notifications where notificationID=?';
        await query(sql, [notificationID]);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getNotification,
    addNotification,
    deleteNotification
}