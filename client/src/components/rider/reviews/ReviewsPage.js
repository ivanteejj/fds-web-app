import React, {Component} from "react"
import MenuBar from "../MenuBar";
import Reviews from "./Reviews";

class ReviewsPage extends Component {
    render() {
        return (
            <div className="Home">
                <header className={"App-header"}>
                    <h1>FDS (Rider)</h1>
                </header>
                <MenuBar/>
                <Reviews/>
            </div>
        )
    }
}

export default ReviewsPage