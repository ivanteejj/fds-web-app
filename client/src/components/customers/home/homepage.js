import React, { Component } from 'react'
import MenuBar from './MenuBar'
import Catalog from './Catalog'
import "./Home.css"

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <header>
                    <h1>FDS</h1>
                </header>
                <>
                    <div>
                        <MenuBar />
                        <Catalog />
                    </div>
                </>
            </div>
        )
    }
}

export default Home