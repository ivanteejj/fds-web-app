import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRiderRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (user.isSignedIn && user.usertype === "rider") {
                    return <Component {...rest} {...props} user={user}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: '/404',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRiderRoute;