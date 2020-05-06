import React from 'react'
import {
    Button,
    Dropdown,
    Menu,
} from 'semantic-ui-react'
import {useHistory} from "react-router-dom"

export default function FdsMenuBar({signout}) {
    let history = useHistory()
    const DropDown = () => (
        <Dropdown text = 'Statistics'>
            <Dropdown.Menu>
                <Dropdown.Item text = 'Summary'
                               onClick={() => history.push("/fds/summary")}/>
                <Dropdown.Item text = 'By Customer'
                               onClick={() => history.push("/fds/stats/customer")}/>
                <Dropdown.Item text = 'By Area'
                               onClick={() => history.push("/fds/stats/area")}/>
                <Dropdown.Item text = 'By Rider'
                               onClick={() => history.push("/fds/stats/rider")}/>
            </Dropdown.Menu>
        </Dropdown>
    )

    return (
        <Menu secondary>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <DropDown/>
                </Menu.Item>

                <Button color={'pink'}
                        size={'tiny'}
                        icon={'percent'}
                        content={'Promotions'}
                        onClick={() => history.push("/fds/promotions")}
                />

                <Button basic color={'black'}
                        size={'tiny'}
                        icon={'sign-out'}
                        content={'Logout'}
                        onClick={() => {
                            signout()
                            return history.push("/login")
                        }}
                />
            </Menu.Menu>
        </Menu>
    )
}