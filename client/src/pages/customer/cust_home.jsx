import React, { Component } from "react";
import { BrowserRouter as Router, 
    Route, 
    Switch, 
    Link, 
    Redirect 
} from "react-router-dom"

import CustomerNavBar from "../../components/customers/ivantest/cust_nav"
import CustomerShoppingPage from "./cust_shop"
import CustomerOrdersPage from "./cust_orders"
import CustomerAccountPage from "./cust_acc"

// import cust_shop from "./cust_shop"

function CustomerHomePage( { match } ) {
    return (
        <div>
        <CustomerNavBar />
        <switch>
            <Route path= { match.url + "/orders"} component = {CustomerOrdersPage}/>
            <Route path= { match.url + "/shop"} component = {CustomerShoppingPage}/>
            <Route path= { match.url + "/account"} component = {CustomerAccountPage}/>
        </switch>
        </div>
    )
}

export default CustomerHomePage