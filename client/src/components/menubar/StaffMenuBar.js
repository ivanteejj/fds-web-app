import React from 'react'
import {
    Button,
    Dropdown,
    Menu,
} from 'semantic-ui-react'

const DropDown = () => (
    <Dropdown text = 'Alice'>
        <Dropdown.Menu>
            <Dropdown.Item text = 'Account Details'/>
            <Dropdown.Item text = 'Logout'/>
        </Dropdown.Menu>
    </Dropdown>
)

const StaffMenuBar = () => (
    <Menu secondary>
        <Menu.Menu position='right'>
            <Button
                size={'tiny'}
                icon={'food'}
                content={'Menu'}
            />

            <Menu.Item>
                <DropDown/>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
)

export default StaffMenuBar