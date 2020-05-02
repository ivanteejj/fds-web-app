import React, {Component} from "react"
import MenuBar from "../MenuBar";
import FdsCustomerStats from "./FdsCustomerStats";

class FdsCustomerStatsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Admin)</h1>
                </header>
                <MenuBar/>
                <FdsCustomerStats/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default FdsCustomerStatsPage