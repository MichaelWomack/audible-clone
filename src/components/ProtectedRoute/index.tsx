import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ProtectedProps {
    component: ComponentClass,
    path: string,
    user: firebase.User
}

const ProtectedRoute: FunctionComponent<ProtectedProps> = ({component, user, ...rest}: ProtectedProps) => {
    if (Boolean(user)) {
        console.log("You logged in!");
        return <Route {...rest} component={component}/>;
    } else {
        console.log("NOT logged in! Going to /login");
        return <Redirect to={{pathname: '/login'}}/>;
    }
};

export default ProtectedRoute;
