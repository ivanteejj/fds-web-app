import React, { Component } from 'react'
import MenuBar from "../home/MenuBar";
import Order from "./Order";


class OrderPage extends Component {
    render() {
        return (
            <>
                <div>
                    <header className={"App-header"}>
                        <h1>FDS</h1>
                    </header>
                    <MenuBar/>
                    <Order/>
                </div>
            </>
        )
    }
}

export default OrderPage

