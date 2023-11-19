const { getFriends, addFriend, removeFriend, blockFriend, acceptFriend, getBlockedFriends, getPendingFriends } = require('../services/friendService');
const { validationResult } = require('express-validator');

const getAllFriendsController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID } = req.body;

    try {
        const friendUserIDs = await getFriends(userID);
        res.status(200).json({ friends: friendUserIDs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBlockedFriendsController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID } = req.body;

    try {
        const blockedUserIds = await getBlockedFriends(userID);
        res.status(200).json({ friends: blockedUserIds });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getPendingFriendsController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID } = req.body;

    try {
        const pendingUserIds = await getPendingFriends(userID);
        res.status(200).json({ friends: pendingUserIds });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addFriendController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID1, userID2 } = req.body;
    try {
        const result = await addFriend(userID1, userID2);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

const acceptFriendController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userID1, userID2 } = req.body;
        const result = await acceptFriend(userID1, userID2);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const removeFriendController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userID1, userID2 } = req.body;
        const result = await removeFriend(userID1, userID2);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const blockFriendController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userID1, userID2 } = req.body;
        const result = await blockFriend(userID1, userID2);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    getAllFriendsController,
    addFriendController,
    removeFriendController,
    blockFriendController,
    acceptFriendController,
    getBlockedFriendsController,
    getPendingFriendsController

}
