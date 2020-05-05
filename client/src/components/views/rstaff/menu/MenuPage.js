import React from "react"
import Menu from "./Menu";
import StaffMenuBar from "../../../menubar/StaffMenuBar";
import StaffHeader from "../../../header/StaffHeader";

function MenuPage (props) {
    return (
        <>
            <div className="Home">
                <StaffHeader/>
                <StaffMenuBar userid={props.user.userid} signout={props.handleSignOut}/>
                <Menu userid={props.user.userid}/>
            </div>
        </>
    )
}

export default MenuPage