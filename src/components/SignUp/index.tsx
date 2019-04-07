import * as React from 'react';
import { Component, Fragment, ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import  withStyles, { WithStyles} from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GoogleIcon, TwitterIcon, FacebookIcon } from '../Icons';
import  SignUpStyles from './SignUpStyles';
import { FormUtils } from "../../utils/FormUtils";
import ValidationTextField from "../ValidationTextField";
import { auth } from "firebase";

export interface SignUpProps extends WithStyles<typeof SignUpStyles>, RouteComponentProps {
    signUp: (email: string, password: string, callback: Function) => void;
    signUpWithAuthProvider: (authProvider: firebase.auth.AuthProvider, callback: Function) => void;
}

export interface SignUpState {
    email?: string;
    password?: string;
    confirmPassword?: string;
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
}

class SignUp extends Component<SignUpProps, SignUpState> {

    readonly state: SignUpState = {
        email: '',
        password: '',
        confirmPassword: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value, id } } = event;
        this.setState({ [id]: value });
    };

    validateConfirmPassword = (value: string): boolean => {
        const { password } = this.state;
        return value === password;
    };

    signUp = () => {
        const { email, password } = this.state;
        const { history, signUp } = this.props;
        signUp(email, password, () => history.push('/login'));
    };

    signUpWithGoogle = () => {
        this.signUpWithAuthProvider(new auth.GoogleAuthProvider());
    };

    signUpWithFacebook = () => {
        this.signUpWithAuthProvider(new auth.FacebookAuthProvider());
    };

    signUpWithTwitter = () => {
        this.signUpWithAuthProvider(new auth.TwitterAuthProvider());
    };

    signUpWithAuthProvider = (provider: auth.AuthProvider) => {
        const { history, signUpWithAuthProvider } = this.props;
        signUpWithAuthProvider(provider, () => history.push('/home'));
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Typography variant="h5">Sign Up</Typography>
                    </div>
                    <form className={classes.formContainer}>
                        <ValidationTextField
                            id="email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            defaultLabel="email"
                            errorLabel="enter a valid email"
                            isValid={FormUtils.isValidEmail}
                            fullWidth={true}
                        />
                        <ValidationTextField
                            id="password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            defaultLabel="password"
                            errorLabel={FormUtils.INVALID_PASSWORD_MESSAGE}
                            isValid={FormUtils.isValidPassword}
                            type="password"
                            fullWidth={true}
                        />
                        <ValidationTextField
                            id="confirmPassword"
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            type="password"
                            onChange={this.handleChange}
                            defaultLabel="confirm password"
                            errorLabel="passwords don't match"
                            isValid={this.validateConfirmPassword}
                            fullWidth={true}
                        />
                        <div className={classes.buttonRow}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={this.signUp}
                                fullWidth={true}
                            >
                                sign up
                            </Button>
                        </div>
                        <Typography variant="subtitle2">sign up with provider</Typography>
                        <div className={classes.buttonRow}>
                            <IconButton onClick={this.signUpWithGoogle}>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton onClick={this.signUpWithTwitter}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton onClick={this.signUpWithFacebook}>
                                <FacebookIcon />
                            </IconButton>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(SignUpStyles)(withRouter(SignUp));