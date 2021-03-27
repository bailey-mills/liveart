const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const AnalyticsPageController = require('../controllers/AnalyticsPageController');
const DAL = require('../dal/dbDrive');

let homePageController = new HomePageController();
let analyticsPageController = new AnalyticsPageController();

routes.use((req, res, next) => {    
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes.get('/', (req,res) => {
    res.json("API is working!")
})

routes.get('/provinces',homePageController.getProvinces);
routes.get('/recommend', homePageController.recommendEvents);

// Analytics
routes.get('/analytics/artist/age', analyticsPageController.getAge);

module.exports = routes;