import React, {Component, useReducer} from 'react'
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
import SummaryDetails from "./components/elements/rider/summary/SummaryDetails";

/* --Protected Paths --*/
import ProtectedCustomerRoute from "./components/views/routes/ProtectedCustomerRoute";
import ProtectedFdsRoute from "./components/views/routes/ProtectedFdsRoute";
import ProtectedRiderRoute from "./components/views/routes/ProtectedRiderRoute";
import ProtectedStaffRoute from "./components/views/routes/ProtectedStaffRoute";

const reducer = (state, action) => {
    switch (action.type) {
        case "signin":
            return {
                isSignedIn: true,
                userid: action.userid,
                usertype: action.usertype
            };
        case "signout":
            return {
                isSignedIn: false,
                userid: null,
                usertype: null
            };
        default:
            return state;
    }
}

function App() {
    const [user, setUser] = useReducer(reducer, {
        isSignedIn: false,
        userid: null,
        usertype: null
    })

    const handleLogin = (userid, type) => {
        console.log("here")
        setUser({type: "signin", userid: userid, usertype: type})
    }

    const handleSignOut = () => {
        setUser({type: "signout"})
    }

    return (
        <Router>
            <Switch>
                <Route exact path= "/test" component = { MenuPage }></Route>
                <ProtectedCustomerRoute exact path= "/customer/order" user={user}
                                        component={OrderPage} handleSignOut={handleSignOut}/>
                <ProtectedCustomerRoute exact path='/customer/shop' user={user}
                                        component={Home} handleSignOut={handleSignOut}/>
                <ProtectedCustomerRoute exact path = "/customer/shop/:rid" user={user}
                                        component = { RestaurantPage } handleSignOut={handleSignOut}/>

                <ProtectedFdsRoute exact path="/fds/summary" user={user}
                                   component={ FdsSummaryPage} handleSignOut={handleSignOut}/>
                <ProtectedFdsRoute exact path="/fds/stats/area" user={user}
                                   component={ FdsAreaStatsPage} handleSignOut={handleSignOut}/>
                <ProtectedFdsRoute exact path="/fds/stats/customer" user={user}
                                   component={ FdsCustomerStatsPage} handleSignOut={handleSignOut}/>
                <ProtectedFdsRoute exact path="/fds/stats/rider" user={user}
                                   component={ FdsRiderStatsPage} handleSignOut={handleSignOut}/>

                <ProtectedRiderRoute exact path="/rider/summary" user={user}
                                     component={ RiderSummaryPage} handleSignOut={handleSignOut}/>
                <ProtectedRiderRoute exact path="/rider/earnings" user={user}
                                     component={ EarningsPage} handleSignOut={handleSignOut}/>
                <ProtectedRiderRoute exact path="/rider/ratings" user={user}
                                     component={ ReviewsPage} handleSignOut={handleSignOut}/>
                <ProtectedRiderRoute exact path="/rider/schedule" user={user}
                                     component={ SchedulePage} handleSignOut={handleSignOut}/>

                <ProtectedStaffRoute exact path="/staff/summary" user={user}
                                     component={ StaffSummaryPage } handleSignOut={handleSignOut}/>
                <ProtectedStaffRoute exact path="/staff/menu" user={user}
                                     component={ MenuPage } handleSignOut={handleSignOut}/>

                <Route exact path = "/404" component = { NotFoundPage }></Route>
                <Route exact path = "/login"
                       handleLogin={handleLogin}
                       render={props => <LoginPage {...props} handleLogin={handleLogin} />}
                />
                <Redirect to = "/404"></Redirect>
            </Switch>
        </Router>
    )
}

export default App;
