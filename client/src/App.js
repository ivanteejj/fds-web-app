import React, {Component} from 'react'
import { BrowserRouter as Router, 
    Route, 
    Switch, 
    Link, 
    Redirect 
} from "react-router-dom"
import logo from './logo.svg'
import './App.css'


//Pages
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import NotFoundPage from "./pages/404"

/* -------------------------- Customer ------------------------------------------*/
import Home from './components/customers/home/homepage'
import RestaurantPage from './components/customers/restaurant/RestaurantPage'
import OrderPage from "./components/customers/orders/OrderPage";

/* -------------------------- Restaurant Staff ------------------------------------------*/
import MenuPage from "./components/staff/Menu/MenuPage";
import SummaryPage from "./components/staff/Home/SummaryPage";

/* -------------------------- Rider ------------------------------------------*/
import SchedulePage from "./components/rider/schedule/SchedulePage";
import EarningsPage from "./components/rider/earnings/EarningsPage";
import ReviewsPage from "./components/rider/reviews/ReviewsPage";
import RiderSummaryPage from "./components/rider/home/RiderSummaryPage";

/* -------------------------- FDS Manager ------------------------------------------*/
import FdsSummaryPage from "./components/fds/home/FdsSummaryPage";
import FdsCustomerStatsPage from "./components/fds/cust_stats/FdsCustomerStatsPage";
import FdsRiderStatsPage from "./components/fds/rider_stats/FdsRiderStatsPage";
import FdsAreaStatsPage from "./components/fds/area_stats/FdsAreaStatsPage";

/* -------------------------- Login/Register ------------------------------------------*/
//import Login from './components/customers/account/login'
import Signup from './components/customers/account/signup'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: " "};
    }

    render() {
        return <Router>
            <Switch>
            <Route exact path= "/test" component = { SummaryPage }></Route>
            <Route exact path= "/order" component = { OrderPage }></Route>
            <Route exact path= "/customer/shop" component = { Home }></Route>
            <Route exact path = "/customer/shop/:rid" component = { RestaurantPage }></Route>
            <Route exact path = "/404" component = { NotFoundPage }></Route>
            <Route exact path = "/login" component = { LoginPage }></Route>
            <Route exact path = "/register" component = { RegisterPage }></Route>
            <Redirect to = "/404"></Redirect>
            </Switch>
        </Router>
    }
}

export default App;
