const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const RegistrationController = require('../controllers/RegistrationController');
const UserProfileController = require('../controllers/UserProfileController');
const EventController = require('../controllers/EventController');
const ProductController = require('../controllers/ProductController');


let homePageController = new HomePageController();
let registrationController = new RegistrationController();
let userProfileController = new UserProfileController();
let eventController = new EventController();
let productController = new ProductController();

routes.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes.get('/', (req,res) => {
    res.json("API is working!");
})

// --------------------
//  ACCOUNT MANAGEMENT
// --------------------
routes.post('/user/register', registrationController.createUser);
routes.post('/user/login', homePageController.authenticate, homePageController.createSession);
routes.get('/user/logout', homePageController.logOut);
routes.patch('/user/updatePassword/:username', userProfileController.updatePassword);

// ---------
//  GENERAL
// ---------
routes.get('/provinces',homePageController.getProvinces);
routes.get('/all-tags', registrationController.getTags);

// -------
//  USERS
// -------
routes.get('/user/bio/:username', userProfileController.getBio);
routes.get('/user/:username', userProfileController.getUser);

// --------
//  EVENTS
// --------
routes.get('/event/getRecommended', eventController.getRecommendEvents);
routes.get('/event/getSubscribed/:username', eventController.getSubscribedEvents);
routes.get('/event/getPlanned/:username', eventController.getPlannedEvents);
routes.post('/event/createEvent/', eventController.createEvent);

// ----------
//  PRODUCTS
// ----------
routes.get('/product/getSold/:username', productController.getSoldProducts);
routes.get('/product/getPurchased/:username', productController.getPurchasedProducts);


module.exports = routes;