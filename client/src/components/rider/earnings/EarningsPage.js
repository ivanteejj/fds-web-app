import React, {Component} from "react"
import MenuBar from "../MenuBar";
import Earnings from "./Earnings";

class EarningsPage extends Component {
    render() {
        return(
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <MenuBar/>
                <Earnings/>
            </div>
        )
    }
}

export default EarningsPage