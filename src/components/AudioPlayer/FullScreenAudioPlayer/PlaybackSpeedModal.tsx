import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/lab/Slider';
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
    slider: {
        padding: '22px 0px',
    },
    label: {
        textAlign: 'center',
        marginBottom: 20
    },
    dialogContent: {
        overflowX: 'hidden'
    }
});

export interface PlaybackSpeedModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    onClose: () => void;
    playbackSpeed: number;
    setPlaybackSpeed: (speed: number) => void;
}

export interface PlaybackSpeedModalState {
    value: number;
}

class PlaybackSpeedModal extends Component<PlaybackSpeedModalProps, PlaybackSpeedModalState> {

    readonly state: PlaybackSpeedModalState = {
        value: 1
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>, value: number) => {
        this.setState({ value });
    };

    applySpeed = () => {
        const { setPlaybackSpeed, onClose } = this.props;
        setPlaybackSpeed(this.state.value);
        onClose();
    };

    render() {
        const { classes, isOpen, onClose } = this.props;
        return (
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Audio Playback Speed</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography id="label" className={classes.label} variant="subtitle2">{`${this.state.value}x`}</Typography>
                    <Slider
                        // classes={{ container: classes.slider }}
                        value={this.state.value}
                        min={0.5}
                        max={2.0}
                        step={0.5}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.applySpeed} color="secondary" autoFocus>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(PlaybackSpeedModal);