import React from 'react'
import CustomerMenuBar from "../../../menubar/CustomerMenuBar";
import Order from "./Order";
import CustomerHeader from "../../../header/CustomerHeader";

function OrderPage (props) {
    return (
        <>
            <div>
                <CustomerHeader/>
                <CustomerMenuBar userid={props.user.userid}/>
                <Order userid={props.user.userid} signout={props.handleSignOut}/>
                <div className="Footer"/>
            </div>
        </>
    )
}

export default OrderPage

