// Importing required modules and controllers
const express = require('express');
const {
    getNotificationController,
    addNotificationController,
    deleteNotificationController
} = require('../controllers/notificationController');
const router = express.Router();

// Route to get notifications for a user
router.get('/notification', getNotificationController);

// Route to add a new notification
router.post('/notification', addNotificationController);

// Route to delete a notification
router.delete('/notification', deleteNotificationController);

// Exporting the router
module.exports = router;
