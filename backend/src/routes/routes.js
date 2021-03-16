const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const DAL = require('../dal/dbDrive');

let homePageController = new HomePageController();

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

module.exports = routes;