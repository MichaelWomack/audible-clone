import * as React from 'react';
import { ChangeEvent, Component, Fragment } from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Switch from "@material-ui/core/Switch/Switch";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import ValidationTextField from "../ValidationTextField";
import { FormUtils } from "../../utils/FormUtils";

export const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: 56,
        height: 'min-content',
    },
    header: {
        textAlign: 'center',
        marginTop: 105,
    },
    sectionContainer: {
        margin: '0 auto',
        width: '60%',
        maxWidth: 400,
        marginTop: 40,
    },
    formElement: {
        margin: `${theme.spacing.unit * 2}px 0px`
    }
});

export interface SettingsProps extends WithStyles<typeof styles> {
    changePassword: (newPassword: string) => void;
    toggleTheme: () => void;
}

export interface SettingsState {
    newPassword?: string;
    confirmNewPassword?: string;
    defaultTheme?: boolean;
}

class Settings extends Component<SettingsProps, SettingsState> {

    state: SettingsState = {
        newPassword: '',
        confirmNewPassword: '',
        defaultTheme: false
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    isValidConfirmPassword = () => {
        return this.state.newPassword === this.state.confirmNewPassword;
    };

    changePassword = () => {
        const { newPassword, confirmNewPassword } = this.state;
        if (newPassword && newPassword === confirmNewPassword) {
            this.props.changePassword(newPassword);
            this.setState({ newPassword: '', confirmNewPassword: '' });
        }
    };

    toggleTheme = () => {
        this.props.toggleTheme();
        this.setState(prevState => ({ defaultTheme: !prevState.defaultTheme }) );
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <Typography variant="h5" className={classes.header}>Settings</Typography>
                    <div className={classes.sectionContainer}>
                        <Typography variant="h6">change password</Typography>
                        <ValidationTextField
                            className={classes.formElement}
                            name="newPassword"
                            onChange={this.handleChange}
                            isValid={FormUtils.isValidPassword}
                            defaultLabel="new password"
                            errorLabel={FormUtils.INVALID_PASSWORD_MESSAGE}
                            value={this.state.newPassword}
                            type="password"
                            fullWidth={true}
                        />
                        <ValidationTextField
                            className={classes.formElement}
                            name="confirmNewPassword"
                            onChange={this.handleChange}
                            isValid={this.isValidConfirmPassword}
                            defaultLabel="confirm new password"
                            errorLabel="passwords don't match"
                            value={this.state.confirmNewPassword}
                            type="password"
                            fullWidth={true}
                        />
                        <Button
                            className={classes.formElement}
                            color="secondary"
                            variant="contained"
                            onClick={this.changePassword}
                        >
                            change password
                        </Button>
                    </div>
                    <div className={classes.sectionContainer}>
                        <Typography variant="h6">theme</Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.defaultTheme}
                                    onChange={this.toggleTheme}
                                />
                            }
                            label="dark"
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Settings);
