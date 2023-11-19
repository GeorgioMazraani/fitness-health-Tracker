const{query}=require('../database/db');
const moment=require('moment');

/**
 * Retrieves all feedback entries for a given user.
 * @param {number} userID - The user's unique identifier.
 * @returns {Promise<Object[]>} A promise that resolves to an array of feedback objects.
 */
const getFeedback=async(userID)=>{
    try{
        let sql='select * from userfeedback where userID=?';
        const feedback=await query(sql,[userID]);
        return feedback;
    }catch(error){
        throw new Error(error);
    }
};

/**
 * Submits new feedback from a user.
 * @param {Object} userfeedback - The feedback object containing userID, content, and dateSubmitted.
 * @returns {Promise<Object>} A promise that resolves to the newly inserted feedback object.
 */
const submitFeedback=async(userfeedback)=>{
    try{
        let insertSql='INSERT INTO userfeedback (userID,content,dateSubmitted) VALUES (?,?,?)';
        await query(insertSql,[
            userfeedback.userID,
            userfeedback.content,
            moment(userfeedback.dateSubmitted).format('YYYY-MM-DD')
        ]);
        let insertedFeedback=await query('SELECT * FROM userfeedback where userID=? ORDER BY feedbackID DESC LIMIT 1',[userfeedback.userID]);
        return insertedFeedback;
    }catch(error){
        throw new Error(error);
    }
};

/**
 * Deletes a feedback entry based on the provided feedbackID.
 * @param {number} feedbackID - The unique identifier of the feedback to be deleted.
 * @returns {Promise<void>} A promise that resolves when the feedback is deleted.
 */
const deleteFeedback=async(feedbackID)=>{
    try{
        let sql='delete from userfeedback where feedbackID=?';
        await query(sql,[feedbackID]);
    }catch(error){
        throw new Error(error);
    }
};

module.exports={
    getFeedback,
    submitFeedback,
    deleteFeedback
}