import React, { Component } from 'react'
import MenuBar from './MenuBar'
import Catalog from './Catalog'

class Home extends Component {
    state = {}

    render() {
        return (
            <div>
                <MenuBar />
                <Catalog />
            </div>
        )
    }
}

export default Home