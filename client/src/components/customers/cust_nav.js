import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'

function CustomerNavBar() {
    return (
        <nav className = "cust_nav">
            <h3>
                Logo
            </h3>

            <ul className = "nav-links">
                <Link to = '/customer/orders'>
                    <li>
                        Orders
                    </li>
                </Link>
                <Link to = '/customer/shop'>
                    <li>
                        Shop
                    </li>
                </Link>
                <Link to = '/customer/account'>
                    <li>
                        Account
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default CustomerNavBar