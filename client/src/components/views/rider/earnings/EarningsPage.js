import React from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Earnings from "./Earnings";
import RiderHeader from "../../../header/RiderHeader";

function EarningsPage (props) {
    return(
        <div className="Home">
            <RiderHeader/>
            <RiderMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            <Earnings userid={props.user.userid} />
            <div className="Footer"/>
        </div>
    )
}

export default EarningsPage