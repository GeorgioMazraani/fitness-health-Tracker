const express=require('express');
const {getNotificationController,addNotificationController,deleteNotificationController}=require('../controllers/notificationController');
const router=express.Router();

router.get('/notification',getNotificationController);
router.post('/notification',addNotificationController);
router.delete('/notification',deleteNotificationController);

module.exports=router;