import React from "react"
import StaffSummary from "./StaffSummary";
import StaffMenuBar from "../../../menubar/StaffMenuBar";
import StaffHeader from "../../../header/StaffHeader";

function StaffSummaryPage (props) {
    return (
        <div className="Home">
            <StaffHeader/>
            <StaffMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
            <StaffSummary userid={props.user.userid}/>
        </div>
    )
}

export default StaffSummaryPage