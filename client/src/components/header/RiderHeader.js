import React from "react"
import {useHistory} from "react-router-dom"

export default function RiderHeader() {
    let history = useHistory()

    return (
        <header className={"App-header"}
                onClick={() => history.push("/rider/summary")}
        >
            <h1>FDS (Rider)</h1>
        </header>
    )
}