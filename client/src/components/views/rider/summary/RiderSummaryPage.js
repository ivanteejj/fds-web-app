import React, {Component} from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Summary from "./Summary";

class RiderSummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <RiderMenuBar/>
                <Summary/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default RiderSummaryPage