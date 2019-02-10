import * as React from 'react';
import { Component, Fragment, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    withStyles,
    WithStyles,
    AppBar,
    Toolbar,
    IconButton,
} from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TwitterIcon, GoogleIcon, FacebookIcon } from '../Icons';

import {auth} from 'firebase';
import LoginStyles from './LoginStyles';
import { UiState } from '../../model/state';

export interface LoginProps
    extends WithStyles<typeof LoginStyles>,
        RouteComponentProps {
    user: firebase.User;
    ui: UiState;
    login: (email: string, password: string, callback: Function) => void;
    loginWithAuthProvider: (authProvider: auth.AuthProvider, callback: Function) => void
}

export interface LoginState {
    email?: string;
    password?: string;
}

export class Login extends Component<LoginProps, LoginState> {
    readonly state: LoginState = {
        email: '',
        password: '',
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    login = () => {
        const { email, password } = this.state;
        const { login, history } = this.props;
        if (email && password) {
            login(email, password, () => history.push('/home'));
            history.push('/home');
        }
    };

    loginWithGoogle = () => {
        this.loginWithAuthProvider(new auth.GoogleAuthProvider());
    }

    loginWithFacebook = () => {
        this.loginWithAuthProvider(new auth.FacebookAuthProvider());
    }
    
    loginWithTwitter = () => {
        this.loginWithAuthProvider(new auth.TwitterAuthProvider());
    }

    private loginWithAuthProvider = (authProvider: auth.AuthProvider) => {
        const {loginWithAuthProvider, history} = this.props;
        loginWithAuthProvider(authProvider, () => history.push('/home'));
    };

    render() {
        const { classes, ui } = this.props;
        return (
            <Fragment>
                <AppBar position="static" color="inherit">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="headline">Audiobucket</Typography>
                        <Typography variant="subheading">
                            <Button>sign up</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.container}>
                    {/* <div className={classes.header}>
                    </div> */}
                    <form className={classes.formContainer}>
                        <TextField
                            className={classes.textField}
                            id="email"
                            label="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth={true}
                        />
                        <TextField
                            className={classes.textField}
                            id="password"
                            label="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                            fullWidth={true}
                        />
                        <div className={classes.buttonRow}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={this.login}
                                fullWidth={true}
                            >
                                login
                            </Button>
                        </div>
                        <div className={classes.buttonRow}>
                            <IconButton onClick={this.loginWithGoogle}>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton onClick={this.loginWithTwitter}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton onClick={this.loginWithFacebook}>
                                <FacebookIcon />
                            </IconButton>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(LoginStyles)(withRouter(Login));
