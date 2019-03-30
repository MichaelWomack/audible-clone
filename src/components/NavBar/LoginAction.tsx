import * as React from 'react';
import { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

export interface LoginActionProps {
    history: { push: (path: string) => void; }
}

export const LoginAction: FunctionComponent<LoginActionProps> = (props) => {
    const navigateToLogin = () => props.history.push('/login');
    return (
        <Typography variant="subtitle1">
            <Button onClick={navigateToLogin}>login</Button>
        </Typography>
    );
};