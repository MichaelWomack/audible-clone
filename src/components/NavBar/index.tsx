import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import NavBarStyles from './NavBarStyles';

export interface NavBarProps extends WithStyles<typeof NavBarStyles> {
    logout: () => void;
    isLoading: boolean;
    isUploading: boolean;
    uploadProgress: number;
}

export interface NavBarState {
    accountMenuAnchorEl: HTMLElement;
}

export class NavBar extends Component<NavBarProps, NavBarState> {
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
    }

    render() {
        const { classes, isLoading, isUploading, uploadProgress } = this.props;
        const { accountMenuAnchorEl } = this.state;
        return (
            <AppBar position="fixed" color="inherit">
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit" className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={this.openAccountMenu}>
                        <AccountCircle />
                    </IconButton>
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
                        <MenuItem onClick={this.closeAccountMenu}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={this.closeAccountMenu}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={this.logout}>
                            Log out
                        </MenuItem>
                    </Menu>
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

export default withStyles(NavBarStyles)(NavBar);
