import React from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import RiderHeader from "../../../header/RiderHeader";
import Summary from "./Summary";

function RiderSummaryPage (props) {
    return (
        <div className="Home">
            <RiderHeader/>
            <RiderMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            <Summary userid={props.user.userid} />
            <div className="Footer"/>
        </div>
    )
}

export default RiderSummaryPage