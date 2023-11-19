const{query}=require('../database/db');
const moment=require('moment');

const getFeedback=async(userID)=>{
    try{
        let sql='select * from userfeedback where userID=?';
        const feedback=await query(sql,[userID]);
        return feedback;
    }catch(error){
        throw new Error(error);
    }
}

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
}

const deleteFeedback=async(feedbackID)=>{
    try{
        let sql='delete from userfeedback where feedbackID=?';
        await query(sql,[feedbackID]);
    }catch(error){
        throw new Error(error);
    }
}

module.exports={
    getFeedback,
    submitFeedback,
    deleteFeedback
}