const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const cors = require('cors');
const Port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers','Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');
    next();
  });
app.use(express.static('public'));
app.use('/files',express.static('public/files'));
app.use('/photos',express.static('public/photos'));
app.use('/api/v1',router)
app.listen(Port,() => console.log(`port ${Port} is listening.`))

