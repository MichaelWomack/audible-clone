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
import { Audio, AudioFile } from '../../model/audio';
import AudioPlayerStyles from './AudioPlayerStyles';
import { PlayerState } from '../../model/state';
import FullScreenAudioPlayer from './FullScreenAudioPlayer';
import { number } from 'prop-types';
import { AudioUtils } from '../../utils/AudioUtils';
import { audio } from '../../store/reducers';

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
        // const track = trackList[currentTime];
        console.log('audio', audio);
        const { trackList, currentTrack } = audio;
        const track = trackList[currentTrack];
        console.log('currentTrack: ', track);
        const audioCurrentTime = track.currentTime || 0;
        this.audioRef.current.currentTime = audioCurrentTime;
        this.setState({ currentPosition: audioCurrentTime });
        this.registerAudioHandlers();
    }
    
    registerAudioHandlers() {
        const { current } = this.audioRef;

        /* this logic could be moved out (redux?) */
        current.onended = (event: Event) => {
            const { audio, updateAudio } = this.props;
            const currentTrack = audio.trackList[audio.currentTrack];
            // currentTrack.currentTime = currentTrack.duration; /* janky, */
            if (audio.currentTrack != audio.trackList.length - 1) {
                audio.currentTrack++;
                this.saveAudioMetrics();
            } else {
                /* if the last track ==> reset to first when done */
                // audio.totalProgress = audio.totalDuration; /** janky, i know */
                audio.currentTrack = 0;
                this.pause();
            }
        }
        current.ontimeupdate = (event: Event) => {
            const currentTime = current.currentTime;
            if (!current.ended) { /* fixes async problem on ending audio */
                this.setState({ currentPosition: Math.floor(currentTime) });
            }
        }
    }

    componentWillUnmount() {
        this.saveAudioMetrics();
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

    /* This could probably be a redux action */
    saveAudioMetrics = () => {
        const { audio, updateAudio } = this.props;
        const currentTrack = audio.trackList[audio.currentTrack];
        currentTrack.currentTime = this.audioRef.current.currentTime;
        const { totalProgress, totalDuration } = AudioUtils.getListeningProgress(audio);
        audio.totalProgress = totalProgress;
        audio.lastPlayed = new Date().getTime();
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
        this.saveAudioMetrics();
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
        const { currentTrack, trackList } = audio;
        const track = trackList[currentTrack];
        const { currentPosition } = this.state;
        return `${TimeUtils.secondsToHHMMSS(currentPosition)} / ${TimeUtils.secondsToHHMMSS(track.duration)}`;
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
        const currentTrack = audio.trackList[audio.currentTrack];
        return (
            audio && (
                <AppBar
                    position="fixed"
                    color="primary"
                    className={classes.audioPlayerBar}
                >
                    <Toolbar className={classes.toolbar}>
                        {/* <img className={classes.toolbarAudioImage} src={audio.imageUrl} />
                        <div className={classes.toolbarControls}> */}
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
                            <Typography 
                                color="inherit"
                                variant="caption"
                            >
                                { `${currentTrack.fileName}(${audio.currentTrack + 1})` }
                            </Typography>
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
                            {/* </div> */}
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
                    <audio ref={this.audioRef} src={currentTrack.downloadUrl} />
                </AppBar>
            )
        );
    }
}
export default withStyles(AudioPlayerStyles)(AudioPlayer);
