import React, {Component} from "react"
import MenuBar from "../MenuBar";
import Summary from "./Summary";

class RiderSummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <MenuBar/>
                <Summary/>
            </div>
        )
    }
}

export default RiderSummaryPage