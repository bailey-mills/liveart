const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const RegistrationController = require('../controllers/RegistrationController');


let homePageController = new HomePageController();
let registertionController = new RegistrationController();

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
routes.get('/all-tags', registertionController.getTags);
routes.post('/register/user', registertionController.createUser);
routes.get('/active-events', homePageController.activeEvents);



module.exports = routes;