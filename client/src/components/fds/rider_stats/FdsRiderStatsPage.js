import React, {Component} from "react"
import MenuBar from "../MenuBar";
import FdsRiderStats from "./FdsRiderStats";

class FdsRiderStatsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <MenuBar/>
                <FdsRiderStats/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default FdsRiderStatsPage