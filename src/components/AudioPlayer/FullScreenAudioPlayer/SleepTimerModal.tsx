import * as React from 'react';
import { Component } from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DoneIcon from '@material-ui/icons/Done';
import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import { TimeUtils } from "../../../utils";
import { SleepTimer } from "../../../model/audio";

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        width: 205,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    }
});

export interface SleepTimerModalProps extends WithStyles<typeof styles> {
    isOpen: boolean;
    onClose: () => void;
    setSleepTimer: (duration: number) => void;
    sleepTimer: SleepTimer;
}

export interface SleepTimerModalState {
    value?: number;
    selectedIndex?: number;
}

const timerValues = [1, 5, 10, 15, 30, 45, 60];

class SleepTimerModal extends Component<SleepTimerModalProps, SleepTimerModalState> {

    readonly state: SleepTimerModalState = {
        value: null,
        selectedIndex: -1,
    };

    componentDidMount() {
        const { sleepTimer } = this.props;
        if (sleepTimer != null) {
            this.setState({ value: sleepTimer.duration, selectedIndex: timerValues.indexOf(sleepTimer.duration) });
        }
    }

    componentDidUpdate(prevProps: SleepTimerModalProps, prevState: SleepTimerModalState) {
        if (prevProps.sleepTimer && this.props.sleepTimer && prevProps.sleepTimer !== this.props.sleepTimer) {
            const { duration } = this.props.sleepTimer;
            this.setState({ value: duration, selectedIndex: timerValues.indexOf(duration) });
        } else if (prevProps.sleepTimer && this.props.sleepTimer === null) {
            this.setState({ value: null, selectedIndex: -1 });
        }
    }

    selectTimerValue(value: number, selectedIndex: number) {
        this.setState({ value, selectedIndex }, () => console.log(this.state));
    }

    applyTimer = () => {
        console.log('applyTimer ', this.state.value);
        this.props.setSleepTimer(this.state.value);
        this.props.onClose();
    };

    renderSelectedIcon(index: number) {
        return this.state.selectedIndex === index &&
            <ListItemIcon>
                <DoneIcon/>
            </ListItemIcon>
    }

    render() {
        const { isOpen, onClose, classes } = this.props;
        return (
            <Dialog open={isOpen}>
                <DialogTitle>Sleep Timer Settings</DialogTitle>
                <DialogContent className={classes.content}>
                    <List>
                        <ListItem
                            button
                            onClick={() => this.selectTimerValue(null, -1)}
                            selected={this.state.selectedIndex === -1}
                        >
                            <ListItemText>
                                Sleep Mode Off
                            </ListItemText>
                            { this.renderSelectedIcon(-1) }
                        </ListItem>
                        {timerValues.map((value, index) =>
                            <ListItem
                                key={value}
                                button
                                onClick={() => this.selectTimerValue(value, index)}
                                selected={this.state.selectedIndex === index}
                            >
                                <ListItemText>
                                    {value} minutes
                                </ListItemText>
                                { this.renderSelectedIcon(index) }
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose}>cancel</Button>
                    <Button color="secondary" onClick={this.applyTimer}>apply</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SleepTimerModal);