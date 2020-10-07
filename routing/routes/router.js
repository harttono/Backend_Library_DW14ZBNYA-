const express = require('express');
const router  = express.Router();

const {register,login,createAdmin} = require('../controller/userRoute');

router.post('/register',register);
router.post('/login',login);
router.get('/createAdmin',createAdmin);


module.exports = router;