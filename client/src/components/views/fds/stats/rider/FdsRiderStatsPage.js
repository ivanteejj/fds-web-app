import React, {Component} from "react"
import FdsMenuBar from "../../../../menubar/FdsMenuBar";
import FdsRiderStats from "./FdsRiderStats";

class FdsRiderStatsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <FdsMenuBar/>
                <FdsRiderStats/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default FdsRiderStatsPage