const{query}=require('../database/db');
const moment=require('moment');

const getNotification=async(userID)=>{
    try{
        let sql='select * from notifications where userID=?';
        const notification=await query(sql,[userID]);
        return notification;
    }catch(error){
        throw new Error(error);
    }
}

const addNotification=async(notifications)=>{
    try{
        let insertSql='INSERT INTO notifications (userID,content,dateCreated) VALUES (?,?,?)';
        await query(insertSql,[
            notifications.userID,
            notifications.content,
            moment(notifications.dateCreated).format('YYYY-MM-DD')
        ]);
        let insertedNotification=await query('SELECT * FROM notifications where userID=? ORDER BY notificationID DESC LIMIT 1',[notifications.userID]);
        return insertedNotification;
    }catch(error){
        throw new Error(error);
    }
}

const deleteNotification=async(notificationID)=>{
    try{
        let sql='delete from notifications where notificationID=?';
        await query(sql,[notificationID]);
    }catch(error){
        throw new Error(error);
    }
}

module.exports={
    getNotification,
    addNotification,
    deleteNotification
}