import React, { Component } from "react"
import MenuBar from "../MenuBar";
import Schedule from "./Schedule";

class SchedulePage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <MenuBar/>
                <Schedule/>
            </div>
        )
    }
}

export default SchedulePage