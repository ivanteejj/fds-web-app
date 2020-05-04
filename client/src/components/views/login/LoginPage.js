import React, { Component } from 'react'
import {
    Button, 
    Divider, 
    Segment
} from 'semantic-ui-react'
import LoginForm from './LoginForm'

class LoginPage extends Component {
    render() {
        return (
            <Segment basic textAlign='center'>
                <LoginForm />
                
                <Divider horizontal>Or</Divider>

                <Button
                color='grey'
                content='Sign up'
                icon='signup'
                size='big'
                labelPosition='left'
                />
            </Segment>
        )
    }
}

export default LoginPage
