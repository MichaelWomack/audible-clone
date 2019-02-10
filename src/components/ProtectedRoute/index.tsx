import * as React from 'react';
import { ComponentClass, SFC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebaseInstance from '../../config/firebase';

interface ProtectedProps {
    component: ComponentClass,
    path: string,
    user: firebase.User
}

const ProtectedRoute: SFC<ProtectedProps> = ({component, user, ...rest}: ProtectedProps) => {
    if (Boolean(user)) {
        console.log("You logged in!");
        return <Route {...rest} component={component}/>;
    } else {
        console.log("NOT logged in! Going to /login");
        return <Redirect to={{pathname: '/login'}}/>;
    }
};

export default ProtectedRoute;
