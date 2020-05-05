import React from "react"
import {useHistory} from "react-router-dom"

export default function StaffHeader() {
    let history = useHistory()

    return (
        <header className={"App-header"}
                onClick={() => history.push("/staff/summary")}
        >
            <h1>FDS (Staff)</h1>
        </header>
    )
}