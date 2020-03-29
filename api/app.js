var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var app = express();

var indexRouter = require('./controllers/index');
var customerController = require('./controllers/customer');
var foodController = require('./controllers/food');


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
app.get('/customer/', (req, res) => foodController.getAllFood(req, res))
app.get('/customer/account/', (req, res) => customerController.getAllCustomerDetails(req, res))
app.get('/customer/account/:userName', (req, res) => customerController.getCustomerDetails(req, res))

module.exports = app;
