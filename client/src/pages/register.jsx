import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <view>
            <h1>
                Register
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
                <div>
                    <label for = "email">Email</label>
                    <input type = "email" id="email" name="email" required></input>
                </div>
                <button type = "submit">Register as Customer</button>
                <button type = "submit">Register as Rider</button>
                <button type = "submit">Register as FDS Manager</button>
                <button type = "submit">Register as Restaurant Staff</button>
            </form>
            <Link to = "/login"> Login </Link>
        </view>
    );
};

export default RegisterPage