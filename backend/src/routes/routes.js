const express = require('express');
const routes =  express.Router();
const HomePageController = require('../controllers/HomePageController');
const AnalyticsPageController = require('../controllers/AnalyticsPageController');
const RegistrationPageController = require('../controllers/RegistrationController');
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');
const ProductController = require('../controllers/ProductController');
const GeneralController = require('../controllers/GeneralController');
const Auctioncontroller = require('../controllers/AuctionController');

let homePageController = new HomePageController();
let registrationController = new RegistrationPageController();
let userProfileController = new UserController();
let eventController = new EventController();
let productController = new ProductController();
let analyticsPageController = new AnalyticsPageController();
let generalController = new GeneralController();
let auctionController = new Auctioncontroller();

routes.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
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
routes.get('/provinces',generalController.getProvinces);
routes.get('/all-tags', generalController.getTags);
routes.get('/all-tags-sorted', generalController.getTagsSorted);
routes.get('/categories', generalController.getCategories);

// -------
//  USERS
// -------
routes.get('/user/bio/:username', userProfileController.getBio);
routes.get('/user/getUser/:username', userProfileController.getUser);
routes.patch('/user/updateUser/:username', userProfileController.updateUser);
routes.get('/user/getSubscribers/:username', userProfileController.getSubscribers);
routes.get('/user/getSubscribedTo/:username', userProfileController.getSubscribedTo);
routes.get('/user/getSubscribersCount/:username', userProfileController.getSubscribersCount);
routes.get('/user/getSubscribedToCount/:username', userProfileController.getSubscribedToCount);
routes.post('/user/toggleSubscription', userProfileController.toggleSubscription);
routes.post('/user/checkSubscription', userProfileController.checkSubscription);
routes.post('/user/search', userProfileController.search);

// --------
//  EVENTS
// --------
routes.get('/event/getRecommended/:username?', eventController.getRecommendEvents);
routes.get('/event/getSubscribed/:username', eventController.getSubscribedEvents);
routes.get('/event/getPlanned/:username', eventController.getPlannedEvents);
routes.post('/event/createEvent/:userID', eventController.createEvent);
routes.get('/event/getByTag/:tagName', eventController.getTagEvents);
routes.get('/event/getSlideshow', eventController.getSlideshow);

// ----------
//  PRODUCTS
// ----------
routes.get('/product/getSold/:username', productController.getSoldProducts);
routes.get('/product/getPurchased/:username', productController.getPurchasedProducts);

// ----------
// AUCTIONS
// ----------
routes.get('/auction/getHost/:eventID', auctionController.getHost);
routes.get('/auction/getProducts/:eventID',auctionController.getEventProducts);
routes.get('/auction/getHighestBid/:productID?', auctionController.getHighestBid);
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
routes.get('/analytics/artist/transactions/:id', analyticsPageController.getTransactionsOverTimeArtist);

// Buyer
routes.get('/analytics/buyer/singles/:id', analyticsPageController.getAnalyticsBuyer);
routes.get('/analytics/buyer/tags/:id', analyticsPageController.getTagsBuyer);
routes.get('/analytics/buyer/transactions/:id', analyticsPageController.getTransactionsOverTimeBuyer);

// Global
routes.get('/analytics/global/tagList', analyticsPageController.getTagList);
routes.get('/analytics/global/tagsGlobal', analyticsPageController.getTagsGlobal);

module.exports = routes;