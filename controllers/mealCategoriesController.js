const {getAllCategories,getCategoryById}=require('../services/mealCategoriesService');

const getAllCategoriesController=async(req,res)=>{
    try{
        const result=await getAllCategories();
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
const getCategoryByIdController=async(req,res)=>{
    const {categoryId}=req.body;
    try{
        const result=await getCategoryById(categoryId);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}

module.exports={
    getAllCategoriesController,
    getCategoryByIdController
}