var express = require('express');
var pController = require('./controllers/pController');
var cookieParser = require('cookie-parser');

var app = express();


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(cookieParser());


pController(app);


app.listen(3000);






