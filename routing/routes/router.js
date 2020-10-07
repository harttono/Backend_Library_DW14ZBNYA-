const express = require('express');
const router  = express.Router();

// user endpoint
const {register,login,createAdmin,getUsers,deleteUser} = require('../controller/userRoute');

router.post('/register',register);
router.post('/login',login);
router.get('/createAdmin',createAdmin);
router.get('/users',getUsers);
router.delete('/users/:id',deleteUser);

//category endpoint

const {addCategory,getAllCategories,detailCategory,updateCategory,deleteCategory} = require('../controller/categoryRoute');

router.get('/category',getAllCategories);
router.post('/category',addCategory);
router.get('/category/:id',detailCategory);
router.patch('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);




module.exports = router;