import React from "react"
import FdsMenuBar from "../../../menubar/FdsMenuBar";
import FdsSummary from "./FdsSummary";
import FdsHeader from "../../../header/FdsHeader";

function FdsSummaryPage (props) {
    return (
        <div className="Home">
            <FdsHeader/>
            <FdsMenuBar signout={props.handleSignOut}/>
            <FdsSummary/>
            <div className="Footer"/>
        </div>
    )
}

export default FdsSummaryPage