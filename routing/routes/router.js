const express = require('express');
const router  = express.Router();

const {register,login,createAdmin,getUsers,deleteUser} = require('../controller/userRoute');

router.post('/register',register);
router.post('/login',login);
router.get('/createAdmin',createAdmin);
router.get('/users',getUsers);
router.delete('/users/:id',deleteUser);


module.exports = router;