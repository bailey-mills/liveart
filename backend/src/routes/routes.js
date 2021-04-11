const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const AnalyticsPageController = require('../controllers/AnalyticsPageController');
const RegistrationPageController = require('../controllers/RegistrationController');
const UserProfileController = require('../controllers/UserProfileController');
const EventController = require('../controllers/EventController');
const ProductController = require('../controllers/ProductController');
const Auctioncontroller = require('../controllers/AuctionController');

let homePageController = new HomePageController();
let registrationController = new RegistrationPageController();
let userProfileController = new UserProfileController();
let eventController = new EventController();
let productController = new ProductController();
let analyticsPageController = new AnalyticsPageController();
let auctionController = new Auctioncontroller();

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
routes.patch('/user/updatePassword', userProfileController.updatePassword);

// ---------
//  GENERAL
// ---------
routes.get('/provinces',homePageController.getProvinces);
routes.get('/all-tags', registrationController.getTags);

// -------
//  USERS
// -------
routes.get('/user/bio/:username', userProfileController.getBio);
routes.get('/user/getUser/:username', userProfileController.getUser);
routes.get('/user/getSubscribers/:username', userProfileController.getSubscribers);

// --------
//  EVENTS
// --------
routes.get('/event/getRecommended/:username?', eventController.getRecommendEvents);
routes.get('/event/getSubscribed/:username', eventController.getSubscribedEvents);
routes.get('/event/getPlanned/:username', eventController.getPlannedEvents);
routes.post('/event/createEvent/:userID', eventController.createEvent);

// ----------
//  PRODUCTS
// ----------
routes.get('/product/getSold/:username', productController.getSoldProducts);
routes.get('/product/getPurchased/:username', productController.getPurchasedProducts);

// ----------
// AUCTIONS
// ----------
routes.get('/auction/getProducts/:eventID',auctionController.getEventProducts);
routes.get('/auction/getHighestBid/:productID', auctionController.getHighestBid);
routes.get('/auction/getCurrentBiddingProduct/:eventID', auctionController.getCurrentProductID);
routes.patch('/auction/skipProduct/:eventID', auctionController.skipProduct);
routes.post('/auction/createBid/:productID', auctionController.createBid);
routes.post('/auction/createTransaction/:bidID', auctionController.createTransaction);


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