import React, { Component } from 'react'
import {
  Button,
  Dropdown,
  Icon,
  Menu,
} from 'semantic-ui-react'

const DropDown = () => (
    <Dropdown text = 'Alice'>
        <Dropdown.Menu>
            <Dropdown.Item text = 'Account Details'/>
            <Dropdown.Item text = 'Past Orders'/>
            <Dropdown.Item text = 'Logout'/>
        </Dropdown.Menu>
    </Dropdown>
)

const MenuBar = () => (
    <Menu secondary>
        <Menu.Menu position='right'>
            <Button>
                <Icon name='shop'/>
            </Button>

            <Menu.Item>
                <DropDown/>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
)

export default MenuBar