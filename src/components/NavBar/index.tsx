import * as React from 'react';
import { Component, SyntheticEvent, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from "@material-ui/core/Avatar";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import NavBarStyles from './NavBarStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { History } from "history";
import { RouteComponentProps, withRouter } from "react-router";
import { Routes } from "../../config/constants";

export interface NavBarProps extends WithStyles<typeof NavBarStyles>, RouteComponentProps {
    logout: () => void;
    isLoading: boolean;
    isUploading: boolean;
    uploadProgress: number;
    user: firebase.User;
    history: History;
}

export interface NavBarState {
    accountMenuAnchorEl: HTMLElement;
}

class NavBar extends Component<NavBarProps, NavBarState> {
    state: NavBarState = {
        accountMenuAnchorEl: null,
    };

    openAccountMenu = (event: SyntheticEvent) => {
        this.setState({ accountMenuAnchorEl: event.currentTarget as HTMLElement });
    };

    closeAccountMenu = () => {
        this.setState({ accountMenuAnchorEl: null });
    };

    logout = () => {
        this.props.logout();
        this.closeAccountMenu();
    };

    goToSettings = () => {
        this.closeAccountMenu();
        this.props.history.push(Routes.SETTINGS);
    };

    getLoginOrSignupAction = (action: "login" | "signup") => {
        const { history } = this.props;
        return (
            <Typography variant="subtitle1">
                <Button onClick={() => history.push(`/${action}`)}>{action}</Button>
            </Typography>
        );
    };

    renderNavbarAction = () => {
        const { user, history, classes } = this.props;
        const { accountMenuAnchorEl } = this.state;

        switch (history.location.pathname) {
            case Routes.LOGIN:
                return this.getLoginOrSignupAction('signup');
            case Routes.SIGNUP:
                return this.getLoginOrSignupAction('login');
            default:
                return (
                    <Fragment>
                        {user &&
                            <Tooltip title={user.email}>
                                {user.photoURL ?
                                    <Avatar
                                        src={`${user.photoURL}`}
                                        onClick={this.openAccountMenu}
                                        className={classes.avatar}
                                    /> :
                                    <IconButton color="inherit" onClick={this.openAccountMenu}>
                                        <AccountCircle/>
                                    </IconButton>
                                }
                            </Tooltip>
                        }
                        <Menu
                            id="menu-appbar"
                            anchorEl={accountMenuAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(accountMenuAnchorEl)}
                            onClose={this.closeAccountMenu}
                        >
                            <MenuItem onClick={this.goToSettings}>
                                settings
                            </MenuItem>
                            <MenuItem onClick={this.logout}>
                                logout
                            </MenuItem>
                        </Menu>
                    </Fragment>
                );
        }
    };

    render() {
        const { classes, isLoading, isUploading, uploadProgress } = this.props;
        return (
            <AppBar position="fixed" color="inherit">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="subtitle1" className={classes.logo}>audiobucket</Typography>
                    {this.renderNavbarAction()}
                </Toolbar>

                {isLoading && !isUploading && (
                    <LinearProgress
                        variant="indeterminate"
                        color="secondary"
                    />)
                }

                {isUploading && (
                    <LinearProgress
                        variant="determinate"
                        color="secondary"
                        value={uploadProgress}
                    />
                )}
            </AppBar>
        );
    }
}

export default withStyles(NavBarStyles)(withRouter(NavBar));