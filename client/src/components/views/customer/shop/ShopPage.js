import React, { Component } from 'react'
import CustomerMenuBar from '../../../menubar/CustomerMenuBar'
import Shop from './Shop'
import "../../../stylesheets/Shop.css"

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <header>
                    <h1>FDS</h1>
                </header>
                <>
                    <div>
                        <CustomerMenuBar />
                        <Shop />
                    </div>
                </>
                <div className="Footer"/>
            </div>
        )
    }
}

export default Home