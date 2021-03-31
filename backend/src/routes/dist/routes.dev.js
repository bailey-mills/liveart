"use strict";

var express = require('express');

var routes = express.Router();

var HomePageController = require('../controllers/HomePageController');

var RegistrationController = require('../controllers/RegistrationController');

var homePageController = new HomePageController();
var registertionController = new RegistrationController();
routes.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
routes.get('/', function (req, res) {
  res.json("API is working!");
});
routes.get('/provinces', homePageController.getProvinces);
routes.get('/recommend', homePageController.recommendEvents);
routes.get('/register/tags', registertionController.getTags);
routes.post('/register/user', registertionController.createUser);
module.exports = routes;