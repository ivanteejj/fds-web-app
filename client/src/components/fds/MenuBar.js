import React from 'react'
import {
    Button,
    Dropdown,
    Menu,
} from 'semantic-ui-react'

const DropDown = () => (
    <Dropdown text = 'Statistics'>
        <Dropdown.Menu>
            <Dropdown.Item text = 'Summary'/>
            <Dropdown.Item text = 'By Customer'/>
            <Dropdown.Item text = 'By Area'/>
            <Dropdown.Item text = 'By Rider'/>
        </Dropdown.Menu>
    </Dropdown>
)

const MenuBar = () => (
    <Menu secondary>
        <Menu.Menu position='right'>
            <Menu.Item>
                <DropDown/>
            </Menu.Item>

            <Button color={'pink'}
                    size={'tiny'}
                    icon={'percent'}
                    content={'Promotions'}
            />

            <Button basic color={'black'}
                size={'tiny'}
                icon={'sign-out'}
                content={'Logout'}
            />
        </Menu.Menu>
    </Menu>
)

export default MenuBar