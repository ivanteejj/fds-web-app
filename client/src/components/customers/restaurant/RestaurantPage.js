import React, { Component } from 'react'
import Restaurant from './Restaurant'

class RestaurantPage extends Component {

    render() {
        return (
            <>
                <div>
                    <header className={"App-header"}>
                        <h1>FDS</h1>
                    </header>
                </div>
                <Restaurant />
            </>
        )
    }
}

export default RestaurantPage