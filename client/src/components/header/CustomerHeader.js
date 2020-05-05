import React from "react"
import {useHistory} from "react-router-dom"

export default function CustomerHeader() {
    let history = useHistory()

    return (
        <header className={"App-header"}
                onClick={() => history.push("/customer/shop")}
        >
            <h1>FDS</h1>
        </header>
    )
}