import React, {Component} from "react"
import MenuBar from "../MenuBar";
import FdsAreaStats from "./FdsAreaStats";

class FdsAreaStatsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <MenuBar/>
                <FdsAreaStats/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default FdsAreaStatsPage