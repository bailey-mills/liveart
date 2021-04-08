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
// Artist
routes.get('/analytics/artist/age/:id', analyticsPageController.getAge);
routes.get('/analytics/artist/ageBoth/:id', analyticsPageController.getAgeBoth);
routes.get('/analytics/artist/location/:id', analyticsPageController.getLocation);
routes.get('/analytics/artist/tags/:id', analyticsPageController.getTagsArtist);
routes.get('/analytics/artist/tagsBoth/:id', analyticsPageController.getTagsBoth);
routes.get('/analytics/artist/singles/:id', analyticsPageController.getAnalyticsArtist);

// Buyer
routes.get('/analytics/buyer/singles/:id', analyticsPageController.getAnalyticsBuyer);
routes.get('/analytics/buyer/tags/:id', analyticsPageController.getTagsBuyer);

// Global
routes.get('/analytics/global/tagList', analyticsPageController.getTagList);
routes.get('/analytics/global/tagsGlobal', analyticsPageController.getTagsGlobal);

module.exports = routes;