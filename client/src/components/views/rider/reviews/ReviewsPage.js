import React, {Component} from "react"
import RiderMenuBar from "../../../menubar/RiderMenuBar";
import Reviews from "./Reviews";

class ReviewsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <RiderMenuBar/>
                <Reviews/>
                <div className="Footer"/>
            </div>
        )
    }
}

export default ReviewsPage