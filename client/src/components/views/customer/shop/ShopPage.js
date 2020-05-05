import React from 'react'
import CustomerMenuBar from '../../../menubar/CustomerMenuBar'
import CustomerHeader from "../../../header/CustomerHeader";
import Shop from './Shop'
import "../../../stylesheets/Shop.css"

function Home (props) {
    return (
        <div className="Home">
            <CustomerHeader/>
            <>
                <div>
                    <CustomerMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
                    <Shop />
                </div>
            </>
            <div className="Footer"/>
        </div>
    )
}

export default Home