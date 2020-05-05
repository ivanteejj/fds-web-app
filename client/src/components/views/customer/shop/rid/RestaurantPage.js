import React from 'react'
import Restaurant from './Restaurant'
import CustomerMenuBar from "../../../../menubar/CustomerMenuBar";
import CustomerHeader from "../../../../header/CustomerHeader";

function RestaurantPage (props) {
    return (
        <>
            <div>
                <CustomerHeader/>
                <CustomerMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            </div>
            <Restaurant userid={props.user.userid}/>
        </>
    )
}

export default RestaurantPage