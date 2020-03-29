import React from "react";
import { Link } from "react-router-dom"

const LoginPage = () => {
    return (
        <view>
            <h1>
                Login
            </h1>
            <form>
                <div>
                    <label for = "name">User name</label>
                    <input type ="text" id="name" name="name" required></input>
                </div>
                <div>
                    <label for = "password">Password</label>
                    <input type = "password" id="password" name="password" required></input>
                </div>
                <button type = "submit">Login as Customer</button>
                <button type = "submit">Login as Rider</button>
                <button type = "submit">Login as FDS Manager</button>
                <button type = "submit">Login as Restaurant Staff</button>
            </form>
            <Link to = "/register"> Register </Link>
        </view>
    )
};

export default LoginPage