import React, {Component} from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Earnings from "./Earnings";

class EarningsPage extends Component {
    render() {
        return(
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <RiderMenuBar/>
                <Earnings/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default EarningsPage