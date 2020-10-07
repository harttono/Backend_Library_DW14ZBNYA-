const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = require('./routing/routes/router');
const port = 5000;


app.use('/api/v1',router)
app.listen(port,() => console.log(`port ${port} is listening.`))

