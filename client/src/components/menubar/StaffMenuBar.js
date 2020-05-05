import React from 'react'
import {
    Button,
    Dropdown,
    Menu,
} from 'semantic-ui-react'
import {useHistory} from "react-router-dom"

export default function StaffMenuBar ({userid, signout}) {
    let history = useHistory()

    const DropDown = () => (
        <Dropdown text = {userid.toString()}>
            <Dropdown.Menu>
                <Dropdown.Item text = 'Account Details'/>
                <Dropdown.Item text = 'Logout'
                               onClick={() => {
                                   signout()
                                   return history.push("/login")
                               }}
                />
            </Dropdown.Menu>
        </Dropdown>
    )

    return (
        <Menu secondary>
            <Menu.Menu position='right'>
                <Button
                    size={'tiny'}
                    icon={'food'}
                    content={'Menu'}
                    onClick={() => history.push("/staff/menu")}
                />

                <Menu.Item>
                    <DropDown/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}