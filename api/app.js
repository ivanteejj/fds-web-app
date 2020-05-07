var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var db = require('./queries')

var app = express();

var indexRouter = require('./controllers/index');
var customerController = require('./controllers/customer');
var foodController = require('./controllers/food');
var restController = require('./controllers/restaurant');
var orderController = require('./controllers/order');
var promoController = require('./controllers/promotion');
var fdsStatsController = require('./controllers/fdsstats');
var reviewController = require('./controllers/review');
var riderController = require('./controllers/rider');


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Routing for customers
app.get('/customer/shop/', (req, res) => restController.getAllRestDataForHomePage(req, res, db))
app.get('/customer/shop/getMenu', (req, res) => foodController.getFoodFromOneRes(req, res, db))
app.get('/customer/shop/getRestaurantDetails/', (req, res) => restController.getOneRestDetails(req, res, db))
app.get('/customer/shop/getRecentDeliveryAddress/', (req, res) => customerController.getRecentDeliveryAddress(req, res, db))
app.get('/customer/shop/getAllOrderDetailsForOneCust/', (req, res) => orderController.getAllOrderDetailsForOrderPage(req, res, db))
app.get('/customer/shop/getAllRelevantPromosForOneCust/', (req, res) => promoController.getAllRelevantPromos(req, res, db))
app.get('/customer/shop/getAllCurrentlyAvailableRider/', (req, res) => riderController.getAllCurrentlyAvailableRider(req, res, db))

app.post('/customer/addRiderReview/', (req, res) => reviewController.addRiderReviewByCustomerPage(req, res, db))
app.post('/customer/addFoodReview/', (req, res) => reviewController.addFoodReviewByCustomerPage(req, res, db))

app.get('/FDSManager/getMainSummaryData/', (req, res) => fdsStatsController.getMainSummaryData(req, res, db))
app.get('/FDSManager/getSummaryDataByCustomer/', (req, res) => fdsStatsController.getSummaryDetailsByCustomer(req, res, db))
app.get('/FDSManager/getSummaryDataByArea/', (req, res) => fdsStatsController.getSummaryDetailsByArea(req, res, db))
app.get('/FDSManager/getPromoStats/', (req, res) => promoController.getAllPromoStatisticsForFDSManagerPage(req, res, db))
app.get('/FDSManager/getRiderSummaryStats/', (req, res) => fdsStatsController.getRiderSummaryStats(req, res, db))

app.get('/Rider/getAllReviewsOfOneRider/', (req, res) => riderController.getAllReviewsOfOneRider(req, res, db))
app.get('/Rider/getOngoingOrders/', (req, res) => orderController.getOngoingOrderForOneRider(req, res, db))
app.post('/Rider/updateRiderDepartForRest/', (req, res) => orderController.updateRiderDepartForRest(req, res, db))
app.post('/Rider/updateRiderArriveRest/', (req, res) => orderController.updateRiderArriveRest(req, res, db))
app.post('/Rider/updateRiderDepartForDeliveryLoc/', (req, res) => orderController.updateRiderDepartForDeliveryLoc(req, res, db))
app.post('/Rider/updateOrderDelivered/', (req, res) => orderController.updateOrderDelivered(req, res, db))



app.get('/staff/getAllOrders/', (req, res) => orderController.getAllOrderDetailsforRestaurantStaffPage(req, res, db))
app.get('/staff/getMostPopularByMonth/', (req, res) => orderController.getMostPopularByMonth(req, res, db))
app.get('/staff/menu/getFoodForRestaurantPage/', (req, res) => foodController.getFoodForRestaurantPage(req, res, db))
app.get('/staff/getPromoStats/', (req, res) => promoController.getAllPromoStatisticsForStaffPage(req, res, db))
app.post('/staff/addNewPromo/', (req, res) => promoController.addNewPromotion(req, res, db))
app.post('/staff/editPromo/', (req, res) => promoController.editPromotion(req, res, db))
app.delete('/staff/deletePromo/', (req, res) => promoController.deletePromotion(req, res, db))

app.post('/FDSManager/addNewPromo/', (req, res) => promoController.addNewPromotion(req, res, db))
app.post('/FDSManager/editPromo/', (req, res) => promoController.editPromotion(req, res, db))
app.delete('/FDSManager/deletePromo/', (req, res) => promoController.deletePromotion(req, res, db))

app.post('/staff/addFood/', (req, res) => foodController.addFoodForRestaurantPage(req, res, db))
app.post('/staff/updateFood/', (req, res) => foodController.updateFoodForRestaurantPage(req, res, db))
app.delete('/staff/deleteFood/', (req, res) => foodController.deleteFoodForRestaurantPage(req, res, db))








// app.get('/customer/account/:userName', (req, res) => customerController.getCustomerDetails(req, res))

module.exports = app;
