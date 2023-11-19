const {getSettingsController,saveSettingsController}=require('../controllers/settingController');
const express=require('express');
const router=express.Router();
const {saveSettingsValidation}=require('../validations/setting-validator');

router.get('/settings',getSettingsController);
router.post('/settings',saveSettingsValidation,saveSettingsController);

module.exports=router;