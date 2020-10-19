const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./routes/router');
const Port = 5000;
// const cors = require('cors');

global.__basedir = __dirname;
// app.use(cors);
// app.use(function(req,res,next){
//     res.header('Access-Control-Allow-Origin',"*");
//     res.header('Access-Control-Allow-Headers',"*");
//     res.header('Access-Control-Allow-Methods',"*");
//     next();
//   })

app.use('/files',express.static('public/file'));
app.use('/profile',express.static('public/profile'));
app.use('/api/v1',router)
app.listen(Port,() => console.log(`port ${Port} is listening.`))

