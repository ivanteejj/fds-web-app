import React, { Component } from "react"
import Summary from "./Summary";
import MenuBar from "../MenuBar";

class SummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Staff)</h1>
                </header>
                <MenuBar/>
                <Summary/>
            </div>
        )
    }
}

export default SummaryPage