const { getFriends, addFriend, removeFriend, blockFriend, acceptFriend, getBlockedFriends, getPendingFriends } = require('../services/friendService');
const { validationResult } = require('express-validator');

/**
 * Controller to retrieve all friends of a user.
 * This function handles the HTTP request and response for getting a user's friends.
 * It extracts the userID from the request body and uses the `getFriends` service.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to retrieve all blocked friends of a user.
 * This function handles the HTTP request and response for getting a user's blocked friends.
 * It extracts the userID from the request body and uses the `getBlockedFriends` service.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to retrieve all pending friend requests of a user.
 * This function handles the HTTP request and response for getting a user's pending friends.
 * It extracts the userID from the request body and uses the `getPendingFriends` service.
 * 
 * @param {Object} req - The request object, containing the userID.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to add a friend for a user.
 * This function handles the HTTP request and response for adding a friend.
 * It validates the request, extracts userIDs from the request body, and uses the `addFriend` service.
 * 
 * @param {Object} req - The request object, containing the userIDs of the two users involved.
 * @param {Object} res - The response object.
 */

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
};

/**
 * Controller to accept a friend request.
 * This function handles the HTTP request and response for accepting a friend request.
 * It validates the request, extracts userIDs from the request body, and uses the `acceptFriend` service.
 * 
 * @param {Object} req - The request object, containing the userIDs of the two users involved.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to remove a friend.
 * This function handles the HTTP request and response for removing a friend.
 * It validates the request, extracts userIDs from the request body, and uses the `removeFriend` service.
 * 
 * @param {Object} req - The request object, containing the userIDs of the two users involved.
 * @param {Object} res - The response object.
 */
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
};

/**
 * Controller to block a user as a friend.
 * This function handles the HTTP request and response for blocking a friend.
 * It validates the request, extracts userIDs from the request body, and uses the `blockFriend` service.
 * 
 * @param {Object} req - The request object, containing the userIDs of the two users involved.
 * @param {Object} res - The response object.
 */
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
};

module.exports = {
    getAllFriendsController,
    addFriendController,
    removeFriendController,
    blockFriendController,
    acceptFriendController,
    getBlockedFriendsController,
    getPendingFriendsController

}
