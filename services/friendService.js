const { query } = require('../database/db');

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
        return { status: 'requested' };
    } catch (error) {
        throw new Error(error);
    }
};

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
        return { status: 'accepted' };
    } catch (error) {
        throw new Error(error);
    }
};

const getBlockedFriends=async(userID)=>{
    try{
        let selectSql=`
            SELECT * FROM  friends 
            WHERE (userID1=? OR userID2=?) AND status='Blocked'`;
        const blocked=await query(selectSql,[userID,userID]);
        const blockedIds=blocked.map(friends=>{
            return friends.userID1==userID?friends.userID1:friends.userID2;
        });
        return blockedIds;
    }catch(error){
        throw new Error(error);
    }
};

const getPendingFriends=async(userID)=>{
    try{
        let selectSql=`
        SELECT * FROM friends 
        WHERE (userID1=? OR userID2=?) AND status='Pending'`;
        const pendingFriends=await query(selectSql,[userID,userID]);
        const pendingIDs=pendingFriends.map(friendships=>{
            return friendships.userID1==userID? friendships.userID1:friendships.userID2;
        });
        return pendingIDs;
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {
    getFriends,
    addFriend,
    acceptFriend,
    removeFriend,
    blockFriend,
    getBlockedFriends,
    getPendingFriends
}
