const{getNotification,addNotification,deleteNotification}=require('../services/notificationService');

const getNotificationController=async(req,res)=>{
    const {userID}=req.body;
    try{
        const notification=await getNotification(userID);
        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addNotificationController=async(req,res)=>{
    const notifications=req.body;
    try{
        const insertedNotification=await addNotification(notifications);
        res.status(200).json({ insertedNotification });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteNotificationController=async(req,res)=>{
    const {notificationID}=req.body;
    try{
        const deletedNotification=await deleteNotification(notificationID);
        res.status(200).json({ deletedNotification });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={
    getNotificationController,
    addNotificationController,
    deleteNotificationController
}