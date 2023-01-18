var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '512mb'}));
app.use(bodyParser.urlencoded({limit: '512mb', extended: true}));

var indexRouter = require('./routes/index');
var v1 = require('./routes/v1');

app.use('/', indexRouter);
app.use('/v1', v1); 

app.use(cookieParser());

module.exports = app;
