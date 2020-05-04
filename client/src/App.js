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
import NotFoundPage from "./components/views/404"

/* -------------------------- Customer ------------------------------------------*/
import Home from './components/views/customer/shop/ShopPage'
import RestaurantPage from './components/views/customer/shop/rid/RestaurantPage'
import OrderPage from "./components/views/customer/order/OrderPage";

/* -------------------------- Restaurant Staff ------------------------------------------*/
import MenuPage from "./components/views/rstaff/menu/MenuPage";
import StaffSummaryPage from "./components/views/rstaff/summary/StaffSummaryPage";

/* -------------------------- Rider ------------------------------------------*/
import SchedulePage from "./components/views/rider/schedule/SchedulePage";
import EarningsPage from "./components/views/rider/earnings/EarningsPage";
import ReviewsPage from "./components/views/rider/reviews/ReviewsPage";
import RiderSummaryPage from "./components/views/rider/summary/RiderSummaryPage";

/* -------------------------- FDS Manager ------------------------------------------*/
import FdsSummaryPage from "./components/views/fds/summary/FdsSummaryPage";
import FdsCustomerStatsPage from "./components/views/fds/stats/customer/FdsCustomerStatsPage";
import FdsRiderStatsPage from "./components/views/fds/stats/rider/FdsRiderStatsPage";
import FdsAreaStatsPage from "./components/views/fds/stats/area/FdsAreaStatsPage";

/* -------------------------- LoginPage/Register ------------------------------------------*/
import LoginPage from './components/views/login/LoginPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: " "};
    }

    render() {
        return <Router>
            <Switch>
            <Route exact path= "/test" component = { SchedulePage }></Route>
            <Route exact path= "/customer/order" component = { OrderPage }></Route>
            <Route exact path= "/customer/shop" component = { Home }></Route>
            <Route exact path = "/customer/shop/:rid" component = { RestaurantPage }></Route>
            <Route exact path = "/404" component = { NotFoundPage }></Route>
            <Route exact path = "/login" component = { LoginPage }></Route>
            <Redirect to = "/404"></Redirect>
            </Switch>
        </Router>
    }
}

export default App;
