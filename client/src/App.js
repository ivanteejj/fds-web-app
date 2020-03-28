import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './components/customers/home/homepage'
import Login from './components/customers/account/login'
import Signup from './components/customers/account/signup'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: " "};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res}))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>FDS</h1>
                </header>
                <Login />
                <p className = "App-intro"> { this.state.apiResponse }</p>
            </div>
        );
    }
}

export default App;
