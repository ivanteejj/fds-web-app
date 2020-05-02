import React, {Component} from "react"
import MenuBar from "../MenuBar";
import FdsSummary from "./FdsSummary";

class FdsSummaryPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <MenuBar/>
                <FdsSummary/>
            </div>
        )
    }
}

export default FdsSummaryPage