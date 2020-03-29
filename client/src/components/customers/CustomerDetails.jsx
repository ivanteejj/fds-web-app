import React from 'react';
import axios from 'axios';

export default class CustomerDetails extends React.Component {
    state = {
        customer: null
    };

    componentDidMount() {
        axios.get('/customer/account/1')
        .then(res => {
            console.log(res);
            this.setState({customer : res.data});
        });
    }

    render() {
        return (
        <div>
            { this.state.customer.map(customer => 
            <h1>
                customer.id
            </h1>) }
        </div>
        )
    }
}