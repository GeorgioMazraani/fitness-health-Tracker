const { getNotification, addNotification, deleteNotification } = require('../services/notificationService');

/**
 * Controller to retrieve notifications for a user.
 * This function handles the HTTP request and response for getting notifications associated with a user.
 * It extracts the userID from the request body and uses the `getNotification` service to retrieve the notifications.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
const getNotificationController = async (req, res) => {
    const { userID } = req.body;
    try {
        const notification = await getNotification(userID);
        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to add a new notification for a user.
 * This function handles the HTTP request and response for adding a notification.
 * It extracts the notification details from the request body and uses the `addNotification` service to store the notification.
 * 
 * @param {Object} req - The request object containing notification details.
 * @param {Object} res - The response object.
 */
const addNotificationController = async (req, res) => {
    const notifications = req.body;
    try {
        const insertedNotification = await addNotification(notifications);
        res.status(200).json({ insertedNotification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to delete a notification.
 * This function handles the HTTP request and response for deleting a specific notification.
 * It extracts the notificationID from the request body and uses the `deleteNotification` service to delete the notification.
 * 
 * @param {Object} req - The request object containing the notificationID.
 * @param {Object} res - The response object.
 */
const deleteNotificationController = async (req, res) => {
    const { notificationID } = req.body;
    try {
        const deletedNotification = await deleteNotification(notificationID);
        res.status(200).json({ deletedNotification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotificationController,
    addNotificationController,
    deleteNotificationController
}