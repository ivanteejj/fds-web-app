import React, { Component } from "react"
import StaffSummary from "./StaffSummary";
import StaffMenuBar from "../../../menubar/StaffMenuBar";

class StaffSummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Staff)</h1>
                </header>
                <StaffMenuBar/>
                <StaffSummary/>
            </div>
        )
    }
}

export default StaffSummaryPage