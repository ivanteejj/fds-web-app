import React, {Component} from "react"
import FdsMenuBar from "../../../menubar/FdsMenuBar";
import FdsSummary from "./FdsSummary";

class FdsSummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <FdsMenuBar/>
                <FdsSummary/>
            </div>
        )
    }
}

export default FdsSummaryPage