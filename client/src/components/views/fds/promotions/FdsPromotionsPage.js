import React from "react"
import FdsHeader from "../../../header/FdsHeader";
import FdsMenuBar from "../../../menubar/FdsMenuBar";
import FdsPromotions from "./FdsPromotions";

function FdsPromotionsPage (props) {
    return (
        <div className="Home">
            <FdsHeader/>
            <FdsMenuBar signout={props.handleSignOut}/>
            <FdsPromotions/>
            <div className="Footer"/>
        </div>
    )
}

export default FdsPromotionsPage