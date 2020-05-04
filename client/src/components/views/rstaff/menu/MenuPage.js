import React, { Component } from "react"
import Menu from "./Menu";
import StaffMenuBar from "../../../menubar/StaffMenuBar";

class MenuPage extends Component {
    render() {
        return (
            <>
                <div className="Home">
                    <header className={"App-header"}>
                        <h1>FDS (Staff)</h1>
                    </header>
                    <StaffMenuBar/>
                    <Menu />
                </div>
            </>
        )
    }
}

export default MenuPage