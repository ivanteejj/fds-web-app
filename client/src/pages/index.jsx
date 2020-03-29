import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h2>
                Main Page.

                Hello! Welcome to FDS!
            </h2>
            <h2>
                <Link to = "/login">
                Go to Login Page
                </Link> 
            </h2>     
            <h2>
                <Link to = "/signup">
                Go to Signup Page
                </Link>             
            </h2>
        </div>
    );
};

export default MainPage