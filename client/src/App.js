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
import SignupPage from "./pages/signup"
import LoginPage from "./pages/login"
import MainPage from "./pages"
import NotFoundPage from "./pages/404"

import Home from './components/customers/home/homepage'
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
            <Route exact path="/" component = { MainPage }></Route>
            <Route exact path = "/404" component = { NotFoundPage }></Route>
            <Route exact path = "/login" component = { LoginPage }></Route>
            <Route exact path = "/signup" component = { SignupPage }></Route>
            <Redirect to = "/404"></Redirect>
            </Switch>
        </Router>
    }
}

export default App;
