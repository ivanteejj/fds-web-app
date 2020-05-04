import React, { Component } from 'react'
import Restaurant from './Restaurant'
import CustomerMenuBar from "../../../../menubar/CustomerMenuBar";

class RestaurantPage extends Component {

    render() {
        return (
            <>
                <div>
                    <header className={"App-header"}>
                        <h1>FDS</h1>
                    </header>
                    <CustomerMenuBar/>
                </div>
                <Restaurant />
            </>
        )
    }
}

export default RestaurantPage