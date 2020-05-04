import React, { Component } from 'react'
import {
    Header,
    Divider, 
    Segment,
    Grid
} from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm";

class LoginPage extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column width={2}/>
                <Grid.Column width={12} textAlign={'center'}>
                    <Header as={'h1'} style={{color: "white", fontSize: "50px"}}>FDS</Header>
                    <Segment basic textAlign='center'>
                        <Grid columns={2} relaxed='very' stackable centered padded>
                            <Grid.Column>
                                <LoginForm />
                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <RegisterForm />
                            </Grid.Column>
                        </Grid>
                        <Divider vertical style={{color: "white"}}>Or</Divider>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={2}/>
            </Grid>
        )
    }
}

export default LoginPage
