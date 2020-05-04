import React, { Component } from 'react'
import CustomerMenuBar from "../../../menubar/CustomerMenuBar";
import Order from "./Order";


class OrderPage extends Component {
    render() {
        return (
            <>
                <div>
                    <header className={"App-header"}>
                        <h1>FDS</h1>
                    </header>
                    <CustomerMenuBar/>
                    <Order/>
                    <div className="Footer"/>
                </div>
            </>
        )
    }
}

export default OrderPage

