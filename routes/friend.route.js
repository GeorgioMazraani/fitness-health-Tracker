// Importing required modules and controllers
const express = require('express');
const {
    getAllFriendsController,
    addFriendController,
    acceptFriendController,
    removeFriendController,
    blockFriendController,
    getBlockedFriendsController,
    getPendingFriendsController
} = require('../controllers/friendController');
const { validateUserId, validateUserIds } = require('../validations/friend-validator');
const router = express.Router();

// Route to get all friends of a user
router.get('/friends', validateUserId, getAllFriendsController);

// Route to get blocked friends
router.get('/blocked', validateUserId, getBlockedFriendsController);

// Route to get pending friend requests
router.get('/pending', validateUserId, getPendingFriendsController);

// Route to add a friend
router.post('/add', validateUserIds, addFriendController);

// Route to accept a friend request
router.put('/accept', validateUserIds, acceptFriendController);

// Route to block a user
router.put('/block', validateUserIds, blockFriendController);

// Route to remove a friend
router.delete('/remove', validateUserIds, removeFriendController);

// Exporting the router
module.exports = router;
