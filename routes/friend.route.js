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

router.get('/friends', validateUserId, getAllFriendsController);
router.get('/blocked', validateUserId, getBlockedFriendsController);
router.get('/pending', validateUserId, getPendingFriendsController);
router.post('/add', validateUserIds, addFriendController);
router.put('/accept', validateUserIds, acceptFriendController);
router.put('/block', validateUserIds, blockFriendController);
router.delete('/remove', validateUserIds, removeFriendController);

module.exports = router;
