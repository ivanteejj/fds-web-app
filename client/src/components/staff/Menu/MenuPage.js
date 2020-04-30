import React, { Component } from "react"
import Menu from "./Menu";
import MenuBar from "../MenuBar";

class MenuPage extends Component {
    render() {
        return (
            <>
                <div className="Home">
                    <header className={"App-header"}>
                        <h1>FDS (Staff)</h1>
                    </header>
                    <MenuBar/>
                    <Menu />
                </div>
            </>
        )
    }
}

export default MenuPage