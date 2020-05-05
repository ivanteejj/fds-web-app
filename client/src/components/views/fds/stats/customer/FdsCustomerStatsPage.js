import React from "react"
import FdsMenuBar from "../../../../menubar/FdsMenuBar";
import FdsCustomerStats from "./FdsCustomerStats";
import FdsHeader from "../../../../header/FdsHeader";

function FdsCustomerStatsPage (props) {
    return (
        <div className="Home">
            <FdsHeader/>
            <FdsMenuBar signout={props.handleSignOut}/>
            <FdsCustomerStats/>
            <div className="Footer"/>
        </div>
    )
}

export default FdsCustomerStatsPage