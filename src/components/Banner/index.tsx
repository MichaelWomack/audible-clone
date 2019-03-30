import * as React from 'react';
import { FunctionComponent } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { BannerType } from "../../config/constants";

const styles = (theme: Theme) => createStyles({
    root: {
        flexWrap: 'unset'
    },
    banner: {
        top: 56,
    },
    icon: {
        fontSize: 20,
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: blue[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
});

export interface BannerProps extends WithStyles<typeof styles> {
    open: boolean;
    message: string;
    variant: BannerType;
    onClose: () => void;
}

const Banner: FunctionComponent<BannerProps> = (props) => {
    const { classes, open, message, variant, onClose, ...rest } = props;
    return (
        <Snackbar
            open={open}
            className={classes.banner}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <SnackbarContent
                classes={{root: classes.root}}
                className={(classes as any)[variant.toString()]}
                message={message}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon}/>
                    </IconButton>,
                ]}
                {...rest}
            />
        </Snackbar>
    );
};

Banner.defaultProps = {
    open: false,
    variant: BannerType.INFO,
};

export default withStyles(styles)(Banner);