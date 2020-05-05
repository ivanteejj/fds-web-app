import React from "react"
import FdsMenuBar from "../../../../menubar/FdsMenuBar";
import FdsRiderStats from "./FdsRiderStats";
import FdsHeader from "../../../../header/FdsHeader";

function FdsRiderStatsPage (props) {
    return (
        <div className="Home">
            <FdsHeader/>
            <FdsMenuBar signout={props.handleSignOut}/>
            <FdsRiderStats/>
            <div className="Footer"/>
        </div>
    )
}

export default FdsRiderStatsPage