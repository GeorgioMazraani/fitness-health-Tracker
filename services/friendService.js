const { query } = require('../database/db');
const { addNotification } = require('./notificationService');
/**
 * Retrieves the user IDs of friends for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<number[]>} A promise that resolves to an array of user IDs of friends.
 */
const getFriends = async (userID) => {
    try {
        let selectSql = `
            SELECT * FROM friends
            WHERE (userID1 = ? OR userID2 = ?) AND status = 'Accepted'`;

        const friendships = await query(selectSql, [userID, userID]);

        const friendUserIDs = friendships.map(friendship => {
            return friendship.userID1 == userID ? friendship.userID2 : friendship.userID1;
        });

        return friendUserIDs;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds a friend request between two users and sends a notification to the added user.
 * @param {number} userID1 - The user ID of the requester.
 * @param {number} userID2 - The user ID of the potential friend.
 * @returns {Promise<Object>} A promise that resolves to the status of the request.
 */
const addFriend = async (userID1, userID2) => {
    try {
        let checkSql = `
            SELECT COUNT(*) AS count FROM friends
            WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)`;

        let checkResult = await query(checkSql, [userID1, userID2, userID2, userID1]);
        if (checkResult[0].count > 0) {
            return { status: 'existing' };
        }

        let insertSql = `
            INSERT INTO friends (userID1, userID2, status) 
            VALUES (?, ?, 'Pending')`;

        await query(insertSql, [userID1, userID2]);
      
        const notification = {
            userID: userID2,
            content: `User ${userID1} has sent you a friend request.`,
            dateCreated: new Date() 
        };

        await addNotification(notification);

        return { status: 'requested' };
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Blocks a user from being a friend.
 * @param {number} userID1 - The user ID of the requester.
 * @param {number} userID2 - The user ID of the user to be blocked.
 * @returns {Promise<Object>} A promise that resolves to the status of the block operation.
 */
const blockFriend = async (userID1, userID2) => {
    try {
        let checkSql = `
            SELECT COUNT(*) AS count FROM friends
            WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)`;

        let checkResult = await query(checkSql, [userID1, userID2, userID2, userID1]);
        if (checkResult[0].count == 0) {
            return { status: 'not_found' };
        }
        let blockSql = `
            UPDATE friends
            SET Status = 'Blocked'
            WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)`;

        await query(blockSql, [userID1, userID2, userID2, userID1]);

        return { status: 'blocked' };
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Removes a friend or cancels a friend request.
 * @param {number} userID1 - The user ID of the requester.
 * @param {number} userID2 - The user ID of the other user involved.
 * @returns {Promise<Object>} A promise that resolves to the status of the remove operation.
 */
const removeFriend = async (userID1, userID2) => {
    try {
        let deleteSql = `
            DELETE FROM friends
            WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)`;

        await query(deleteSql, [userID1, userID2, userID2, userID1]);
        return { status: 'removed' };
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Accepts a friend request.
 * @param {number} userID1 - The user ID of the requester.
 * @param {number} userID2 - The user ID of the user who sent the friend request.
 * @returns {Promise<Object>} A promise that resolves to the status of the accept operation.
 */
const acceptFriend = async (userID1, userID2) => {
    try {
        let checkSql = `
            SELECT COUNT(*) AS count FROM friends
            WHERE ((userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)) AND status = 'Pending'`;

        let checkResult = await query(checkSql, [userID1, userID2, userID2, userID1]);
        if (checkResult[0].count === 0) {
            return { status: 'not_found' };
        }

        let acceptSql = `
            UPDATE friends
            SET status = 'Accepted'
            WHERE ((userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)) AND status = 'Pending'`;

        await query(acceptSql, [userID1, userID2, userID2, userID1]);

        await addNotification({
            userID: userID1, 
            content: `User ${userID2} has accepted your friend request.`,
            dateCreated: new Date()
        });

        return { status: 'accepted' };
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves the user IDs of blocked friends for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<number[]>} A promise that resolves to an array of user IDs who are blocked.
 */
const getBlockedFriends = async (userID) => {
    try {
        let selectSql = `
            SELECT * FROM  friends 
            WHERE (userID1=? OR userID2=?) AND status='Blocked'`;
        const blocked = await query(selectSql, [userID, userID]);
        const blockedIds = blocked.map(friends => {
            return friends.userID1 == userID ? friends.userID1 : friends.userID2;
        });
        return blockedIds;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves the user IDs of pending friend requests for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<number[]>} A promise that resolves to an array of user IDs who have pending requests.
 */
const getPendingFriends = async (userID) => {
    try {
        let selectSql = `
        SELECT * FROM friends 
        WHERE (userID1=? OR userID2=?) AND status='Pending'`;
        const pendingFriends = await query(selectSql, [userID, userID]);
        const pendingIDs = pendingFriends.map(friendships => {
            return friendships.userID1 == userID ? friendships.userID1 : friendships.userID2;
        });
        return pendingIDs;
    } catch (error) {
        throw new Error(error);
    }
};


const getRelationshipStatus = async (currentUserID, profileUserID) => {
    try {
        const sql = `
            SELECT status FROM friends
            WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)`;

        const values = [currentUserID, profileUserID, profileUserID, currentUserID];
        const result = await query(sql, values);

        if (result.length > 0) {
            const status = result[0].status;
            switch (status) {
                case 'Pending':
            
                    return result[0].userID1 === currentUserID ? 'pending' : 'requested';
                case 'Accepted':
                    return 'friends';
                case 'Blocked':
                    return 'blocked';
                default:
                    return 'none';
            }
        } else {
            return 'none'; // No relationship found
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getFriends,
    addFriend,
    acceptFriend,
    removeFriend,
    blockFriend,
    getBlockedFriends,
    getPendingFriends,
    getRelationshipStatus
}
