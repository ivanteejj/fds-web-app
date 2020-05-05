import React from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Reviews from "./Reviews";
import RiderHeader from "../../../header/RiderHeader";

function ReviewsPage (props) {
    return (
        <div className="Home">
            <RiderHeader/>
            <RiderMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            <Reviews userid={props.user.userid}/>
            <div className="Footer"/>
        </div>
    )
}

export default ReviewsPage