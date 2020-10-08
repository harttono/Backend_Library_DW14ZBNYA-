const express = require('express');
const router  = express.Router();
const {isAuth}   = require('../../utils/auth');

// user endpoint
const {register,login,createAdmin,getUsers,deleteUser} = require('../controller/userRoute');

router.post('/register',register);
router.post('/login',login);
router.get('/createAdmin',createAdmin);
router.get('/users',isAuth,getUsers);
router.delete('/users/:id',deleteUser);

//category endpoint

const {addCategory,getAllCategories,detailCategory,updateCategory,deleteCategory} = require('../controller/categoryRoute');

router.get('/category',getAllCategories);
router.post('/category',addCategory);
router.get('/category/:id',detailCategory);
router.patch('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);

const {getBooks,add_Book,edit_Book,delete_Book} = require('../controller/bookRoute');
router.get('/books',getBooks);
router.post('/book',add_Book);
router.patch('/book/:id',edit_Book);
router.delete('/book/:id',delete_Book);




module.exports = router;