import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import PauseSharp from '@material-ui/icons/PauseSharp';
import Forward30 from '@material-ui/icons/Forward30';
import Replay30 from '@material-ui/icons/Replay30';
import KeyboardArrowDownSharp from '@material-ui/icons/KeyboardArrowDownSharp';
import KeyboardArrowUpSharp from '@material-ui/icons/KeyboardArrowUpSharp';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { TimeUtils } from '../../utils';
import { Audio } from '../../model/audio';
import AudioPlayerStyles from './AudioPlayerStyles';
import { PlayerState } from '../../model/state';
import FullScreenAudioPlayer from './FullScreenAudioPlayer';

export interface AudioPlayerProps extends WithStyles<typeof AudioPlayerStyles> {
    audio: Audio;
    togglePlaying: Function;
    playAudio: Function;
    pauseAudio: Function;
    showPlayer: () => void;
    hidePlayer: () => void;
    openFullscreen: () => void;
    closeFullscreen: () => void;
    updateAudio: (audio: Audio) => void;
    player: PlayerState;
}

export interface AudioPlayerState {
    currentPosition?: number;
}

export class AudioPlayer extends Component<AudioPlayerProps, AudioPlayerState> {
    intervalHandle: NodeJS.Timer;
    audioRef: React.RefObject<HTMLAudioElement>;

    readonly state: AudioPlayerState = {
        currentPosition: 0,
    };

    constructor(props: AudioPlayerProps) {
        super(props);
        this.audioRef = React.createRef<HTMLAudioElement>(); /** Needs to be done here, not in componentDidMount */
    }

    componentDidMount() {
        const { audio } = this.props;
        const audioCurrentTime = audio.currentTime || 0;
        this.audioRef.current.currentTime = audioCurrentTime;
        this.setState({ currentPosition: audioCurrentTime });
        this.registerAudioHandlers();
    }
    
    registerAudioHandlers() {
        const { current } = this.audioRef;
        current.onended = (event: Event) => {
            const { duration } = current;
            current.currentTime = duration;
            this.pause();
        }
        current.ontimeupdate = (event: Event) => {
            const currentTime = current.currentTime;
            if (!current.ended) { /* fixes async problem on ending audio */
                this.setState({ currentPosition: Math.floor(currentTime) });
            }
        }
    }

    componentWillUnmount() {
        this.saveAudioPosition();
    }

    componentDidUpdate(prevProps: AudioPlayerProps, prevState: AudioPlayerState) {
        if (this.audioRef.current.paused && this.props.player.isPlaying) {
            this.play();
        } else if (!this.audioRef.current.paused && !this.props.player.isPlaying) {
            this.pause();
        }

        /** update the audioRef currentTime if a new audio file has been selected */
        if (prevProps.audio !== this.props.audio) {
            this.audioRef.current.currentTime = this.props.audio.currentTime || 0;
            this.props.updateAudio(prevProps.audio);
        }
    }

    saveAudioPosition = () => {
        const { audio, updateAudio } = this.props;
        audio.currentTime = this.audioRef.current.currentTime;
        updateAudio(audio);
    };

    play = () => {
        this.props.playAudio();
        const playPromise = this.audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.error(error));
        }
    };

    pause = () => {
        this.props.pauseAudio();
        this.audioRef.current.pause();
        this.saveAudioPosition();
    };

    togglePlaying = () => {
        const { player } = this.props;
        player.isPlaying ? this.pause() : this.play();
    };

    addToCurrentTime = (change: number) => {
        this.setState({ currentPosition: this.audioRef.current.currentTime += change });
    };

    setCurrentTime = (time: number) => {
        this.audioRef.current.currentTime = time
        this.setState({currentPosition: time});
    }

    decrement30 = () => {
        this.addToCurrentTime(-30);
    }

    increment30 = () => {
        this.addToCurrentTime(30);
    }

    displayAudioTime = () => {
        const { audio } = this.props;
        const { currentPosition } = this.state;
        const { duration } = audio;
        return `${TimeUtils.secondsToHHMMSS(
            currentPosition,
        )} / ${TimeUtils.secondsToHHMMSS(duration)}`;
    };

    render() {
        const {
            classes,
            player,
            audio,
            hidePlayer,
            openFullscreen,
            closeFullscreen,
        } = this.props;
        const { currentPosition } = this.state;
        return (
            audio && (
                <AppBar
                    position="fixed"
                    color="primary"
                    className={classes.audioPlayerBar}
                >
                    <Toolbar className={classes.toolbar}>
                        {
                            <Typography
                                component="span"
                                variant="caption"
                                color="inherit"
                                className={classes.audioTime}
                            >
                                {this.displayAudioTime()}
                            </Typography>
                        }
                        <IconButton
                            color="inherit"
                            onClick={this.decrement30}
                        >
                            <Replay30 />
                        </IconButton>
                        <div>
                            <IconButton
                                color="inherit"
                                onClick={this.togglePlaying}
                            >
                                {player.isPlaying ? (
                                    <PauseSharp />
                                ) : (
                                    <PlayArrowSharpIcon />
                                )}
                            </IconButton>
                        </div>
                        <IconButton
                            color="inherit"
                            onClick={this.increment30}
                        >
                            <Forward30 />
                        </IconButton>
                        {player.isPlaying ? (
                            <IconButton
                                color="inherit"
                                onClick={openFullscreen}
                            >
                                <KeyboardArrowUpSharp />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="inherit"
                                onClick={hidePlayer}
                            >
                                <KeyboardArrowDownSharp />
                            </IconButton>
                        )}
                    </Toolbar>
                    {this.audioRef.current && <FullScreenAudioPlayer
                        onClose={closeFullscreen}
                        onOpen={openFullscreen}
                        isOpen={player.fullscreen}
                        audio={audio}
                        audioRef={this.audioRef}
                        forward={this.increment30}
                        replay={this.decrement30}
                        play={this.play}
                        pause={this.pause}
                        isPlaying={player.isPlaying}
                        setCurrentTime={this.setCurrentTime}
                    />}
                    <audio ref={this.audioRef} src={audio.downloadUrl} />
                </AppBar>
            )
        );
    }
}
export default withStyles(AudioPlayerStyles)(AudioPlayer);
