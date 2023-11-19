const express=require('express');
const {getAllCategoriesController,getCategoryByIdController}=require('../controllers/mealCategoriesController');
const router=express.Router();

router.get('/categories',getAllCategoriesController);
router.get('/category',getCategoryByIdController);

module.exports=router;