const express = require('express');
const router  = express.Router();
const {isAuth,isAdmin}   = require('../../middleware/auth');
const {upload,getListFiles} = require('../controller/UploaderRoute')

// user endpoint
const {register,login,createAdmin,getUsers,deleteUser,updateUser} = require('../controller/userRoute');

router.post('/register',register);
router.post('/login',login);
router.post('/createAdmin',createAdmin);
router.get('/users',isAuth,isAdmin,getUsers);
router.delete('/user/:id',isAuth,isAdmin,deleteUser);
router.patch('/user/:id',isAuth,updateUser);

// category endpoint
const {addCategory,getAllCategories,detailCategory,updateCategory,deleteCategory} = require('../controller/categoryRoute');

router.get('/category',isAuth,getAllCategories);
router.post('/category',isAuth,isAdmin,addCategory);
router.get('/category/:id',isAuth,isAdmin,detailCategory);
router.patch('/category/:id',isAuth,updateCategory);
router.delete('/category/:id',isAuth,isAdmin,deleteCategory);

// book endpoint
const {add_Book,edit_Book,detail_Book,getBooks_ByCategory,delete_Book} = require('../controller/bookRoute');
router.post('/book',isAuth,add_Book);
router.get('/book/:id',isAuth,detail_Book);
router.patch('/book/:id',isAuth,edit_Book);
router.get('/books',getBooks_ByCategory);
router.delete('/book/:id',isAuth,delete_Book)

// transaction list endpoint
const {list_Books,edit_BookUser,get_bookUser} = require('../controller/transactionRoute');
router.get('/list_transaction',isAuth,isAdmin,list_Books);
router.patch('/list-books/:id',isAuth,isAdmin,edit_BookUser);
router.get('/book-user',isAuth,get_bookUser);

// bookmark endpoint
const {addBookmark,deleteBookmark,getMyBookmark} = require('../controller/bookmarkRoute');
router.get('/bookmark',isAuth,addBookmark);
router.delete('/bookmark/:bookId',isAuth,deleteBookmark);
router.get('/bookmarks',isAuth,getMyBookmark);

// upload file
router.post('/upload',upload);
router.get('/files',getListFiles);
module.exports = router;