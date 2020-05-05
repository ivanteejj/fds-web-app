import React, { Component } from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Schedule from "./Schedule";
import RiderHeader from "../../../header/RiderHeader";

function SchedulePage (props) {
    return (
        <div className="Home">
            <RiderHeader/>
            <RiderMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            <Schedule userid={props.user.userid}/>
            <div className="Footer"/>
        </div>
    )
}

export default SchedulePage