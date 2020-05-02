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

// app.get('/customer/account/:userName', (req, res) => customerController.getCustomerDetails(req, res))

module.exports = app;
