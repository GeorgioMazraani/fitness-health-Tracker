const express = require('express');
const { getAllUsersController, getUserController, insertUserController, updateUserController, deleteUserController } = require('../controllers/userController');
const router = express.Router();
const {insertUserValidation,updateUserValidation}=require('../validations/user-validator');

router.get('/users', getAllUsersController);
router.get('/user', getUserController);
router.post('/user', insertUserValidation,insertUserController);
router.put('/user', updateUserValidation,updateUserController);
router.delete('/user', deleteUserController);

module.exports = router;