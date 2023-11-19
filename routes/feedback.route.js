const express=require('express');
const {getFeedbackController,submitFeedbackController,deleteFeedbackController}=require('../controllers/feedbackController');
const router=express.Router();
const {validateSubmitFeedback,validateDeleteFeedback}=require('../validations/feedback-validator');

router.get('/feedback',getFeedbackController);
router.post('/feedback',validateSubmitFeedback,submitFeedbackController);
router.delete('/feedback',validateDeleteFeedback,deleteFeedbackController);

module.exports=router;