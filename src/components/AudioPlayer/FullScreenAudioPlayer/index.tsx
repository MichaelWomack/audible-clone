import * as React from 'react';
import { Component, RefObject } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrowSharp';
import PauseSharp from '@material-ui/icons/PauseSharp';
import Forward30 from '@material-ui/icons/Forward30';
import Replay30 from '@material-ui/icons/Replay30';
import KeyboardArrowDownSharp from '@material-ui/icons/KeyboardArrowDownSharp';
import Slide from '@material-ui/core/Slide';
import Slider from '@material-ui/lab/Slider';
import FullScreenAudioPlayerStyles from './FullScreenAudioPlayerStyles';
import { Audio } from '../../../model/audio';
import Typography from '@material-ui/core/Typography';
import { TimeUtils } from '../../../utils';

function Transition(props: any) {
    return <Slide direction="left" unmountOnExit {...props} />;
}

interface Props extends WithStyles<typeof FullScreenAudioPlayerStyles> {
    onClose: () => void;
    onOpen: () => void;
    isOpen: boolean;
    audio: Audio;
    forward: () => void;
    replay: () => void;
    play: () => void;
    pause: () => void;
    isPlaying: boolean;
    audioRef: RefObject<HTMLAudioElement>;
}

class FullScreenAudioPlayer extends Component<Props, {}> {

    displayTimeRemaining() {
        const { current: { currentTime, duration } } = this.props.audioRef;
        const timeRemaining = duration - currentTime;
        const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(Math.floor(timeRemaining));
        let display = "";
        if (hours > 0) {
            display = `${hours}h`;
        }
        if (minutes > 0) {
            display = `${display} ${minutes}m`;
        }
        if (seconds > 0 || (minutes === 0 && hours === 0)) {
            display = `${display} ${seconds}s`;
        }
        return display.trim();
    }

    render() {
        const {
            classes,
            isOpen,
            onClose,
            audio,
            audioRef,
            isPlaying,
            forward,
            replay,
            play,
            pause,
        } = this.props;

        return (
            <div className={classes.container}>
                <Dialog
                    fullScreen
                    open={isOpen}
                    onClose={onClose}
                    TransitionComponent={Transition}
                >
                    <div className={classes.header}>
                        <IconButton onClick={onClose}>
                            <KeyboardArrowDownSharp fontSize="large"/>
                        </IconButton>
                    </div>
                    <img src={audio.imageUrl} className={classes.image} />

                    {audioRef && audioRef.current && 
                    // <div className={classes.sliderContainer}>
                        <Slider
                            className={classes.slider}
                            value={audioRef.current.currentTime}
                            max={audio.duration}
                            onChange={(e) => console.log(e.target)}
                        />
                    // </div>
                    }
                    <Typography className={classes.sliderLabel}>{`${this.displayTimeRemaining()} remaining`}</Typography>
                    <div className={classes.controls}>
                        <IconButton onClick={replay}>
                            <Replay30 fontSize="large"/>
                        </IconButton>
                        <IconButton>
                            {isPlaying ? (
                                <PauseSharp fontSize="large" onClick={pause}/>
                            ) : (
                                <PlayArrowIcon fontSize="large" onClick={play}/>
                            )}
                        </IconButton>
                        <IconButton onClick={forward}>
                            <Forward30 fontSize="large"/>
                        </IconButton>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(FullScreenAudioPlayerStyles)(FullScreenAudioPlayer);
