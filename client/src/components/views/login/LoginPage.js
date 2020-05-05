import React, { Component } from 'react'
import {
    Header,
    Divider, 
    Segment,
    Grid
} from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm";

const LoginPage = props => {
    return (
        <div style={{backgroundColor: "#252839"}}>
            <Grid textAlign='center' style={{ height: '110vh' }} verticalAlign='middle'>
                <Grid.Column width={2}/>
                <Grid.Column width={12} textAlign={'center'}>
                    <Header as={'h1'} style={{color: "white", fontSize: "50px"}}>FDS</Header>
                    <Segment textAlign='center' basic>
                        <Grid columns={2} relaxed='very' centered padded>
                            <Grid.Column>
                                <LoginForm validLogin={props.handleLogin}/>
                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <RegisterForm validRegister={props.handleLogin}/>
                            </Grid.Column>
                        </Grid>
                        <Divider vertical style={{color: "white"}}>Or</Divider>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={2}/>
            </Grid>
        </div>
        )
}

export default LoginPage
