import React, { Component } from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Schedule from "./Schedule";

class SchedulePage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <RiderMenuBar/>
                <Schedule/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default SchedulePage