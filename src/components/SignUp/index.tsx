import * as React from 'react';
import { Component, Fragment, ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import  withStyles, { WithStyles} from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GoogleIcon, TwitterIcon, FacebookIcon } from '../Icons';
import  SignUpStyles from './SignUpStyles';
import { authService } from "../../services";
import { FormUtils } from "../../utils/FormUtils";

export interface SignUpProps extends WithStyles<typeof SignUpStyles>, RouteComponentProps {}

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

    validateEmail = (event: ChangeEvent<HTMLInputElement>) => {
        let emailError = '';
        const email = event.target.value;
        const isValid = FormUtils.isValidEmail(email);
        if (email && !isValid) emailError = 'enter a valid email';
        this.setState({ emailError });
    };

    validateConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        let confirmPasswordError = '';
        if (event.target.value && event.target.value !== this.state.password) {
            confirmPasswordError = "passwords don't match";
        }
        this.setState({ confirmPasswordError });
    };

    signUp = async () => {
        const { email, password } = this.state;
        const userCredential = await authService.createUserWithEmailAndPassword(email, password);
        await userCredential.user.sendEmailVerification();
    };

    navigateToLogin = () => {
        this.props.history.push('/login');
    };

    render() {
        const { classes } = this.props;
        const { confirmPasswordError, emailError } = this.state;
        return (
            <Fragment>
                <AppBar position="static" color="inherit">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="headline">Audiobucket</Typography>
                        <Typography variant="subheading">
                            <Button onClick={this.navigateToLogin}>login</Button>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.container}>
                    <div className={classes.header}>
                        <Typography variant="h5">Sign Up</Typography>
                    </div>
                    <form className={classes.formContainer}>
                        <TextField
                            error={Boolean(emailError)}
                            className={classes.textField}
                            id="email"
                            label={Boolean(emailError) ? emailError : "email"}
                            value={this.state.email}
                            onChange={this.handleChange}
                            onBlur={this.validateEmail}
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
                        <TextField
                            error={Boolean(confirmPasswordError)}
                            className={classes.textField}
                            id="confirmPassword"
                            label={Boolean(confirmPasswordError) ? confirmPasswordError : "confirm password" }
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            onBlur={this.validateConfirmPassword}
                            type="password"
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
                        <div className={classes.buttonRow}>
                            <IconButton onClick={() =>{}}>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton onClick={() =>{}}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton onClick={() =>{}}>
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