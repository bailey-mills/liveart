"use strict";

var express = require('express');

var routes = require('./routes/routes');

require('dotenv').config();

var cookieParser = require('cookie-parser');

var app = express(); // middleware

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var port = process.env.PORT;
app.use('/', routes);
app.listen(port, function () {
  return console.log("Server started on port ".concat(port));
});