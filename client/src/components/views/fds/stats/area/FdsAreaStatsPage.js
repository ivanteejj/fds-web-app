import React from "react"
import FdsMenuBar from "../../../../menubar/FdsMenuBar";
import FdsAreaStats from "./FdsAreaStats";
import FdsHeader from "../../../../header/FdsHeader";

function FdsAreaStatsPage (props) {
    return (
        <div className="Home">
            <FdsHeader/>
            <FdsMenuBar signout={props.handleSignOut}/>
            <FdsAreaStats/>
            <div className="Footer"/>
        </div>
    )
}

export default FdsAreaStatsPage