import React from 'react'
import {
    Button,
    Dropdown,
    Menu,
} from 'semantic-ui-react'
import {useHistory} from "react-router-dom"

export default function RiderMenuBar ({userid, signout}) {
    let history = useHistory()
    const DropDown = () => (
        <Dropdown text = {userid.toString()}>
            <Dropdown.Menu>
                <Dropdown.Item text = 'Account Details'/>
                <Dropdown.Item text = 'My Ratings'
                               onClick={() => history.push("/rider/ratings")}/>
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
                    icon={'eye'}
                    content={'Schedule'}
                    onClick={() => history.push("/rider/schedule")}
                />

                <Button basic
                        size={'tiny'}
                        icon={'dollar'}
                        content={'My Earnings'}
                        onClick={() => history.push("/rider/earnings")}
                />

                <Menu.Item>
                    <DropDown/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}