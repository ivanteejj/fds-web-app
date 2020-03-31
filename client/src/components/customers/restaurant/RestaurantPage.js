import React, { Component } from 'react'
import Restaurant from './Restaurant'
import MenuBar from "../home/MenuBar";

class RestaurantPage extends Component {

    render() {
        return (
            <>
                <div>
                    <header className={"App-header"}>
                        <h1>FDS</h1>
                    </header>
                    <MenuBar/>
                </div>
                <Restaurant />
            </>
        )
    }
}

export default RestaurantPage