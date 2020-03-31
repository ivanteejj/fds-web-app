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
import Home from './components/customers/home/homepage'
import RestaurantPage from './components/customers/restaurant/RestaurantPage'
import OrderPage from "./components/customers/orders/OrderPage";
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
            <Route exact path="/" component = { OrderPage }></Route>
            <Route exact path = "/404" component = { NotFoundPage }></Route>
            <Route exact path = "/login" component = { LoginPage }></Route>
            <Route exact path = "/register" component = { RegisterPage }></Route>
            <Redirect to = "/404"></Redirect>
            </Switch>
        </Router>
    }
}

export default App;
