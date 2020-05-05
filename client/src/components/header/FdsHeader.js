import React from "react"
import {useHistory} from "react-router-dom"

export default function FdsHeader() {
    let history = useHistory()

    return (
        <header className={"App-header"}
                onClick={() => history.push("/fds/summary")}
        >
            <h1>FDS (Admin)</h1>
        </header>
    )
}