import * as React from 'react';
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownSharp from '@material-ui/icons/KeyboardArrowDownSharp';
import KeyboardArrowUpSharp from '@material-ui/icons/KeyboardArrowUpSharp';
import PlayArrowSharp from '@material-ui/icons/PlayArrowSharp';
import PauseSharp from '@material-ui/icons/PauseSharp';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { TimeUtils } from '../../utils';
import { Audio, SleepTimer } from '../../model/audio';
import { PlayerState } from '../../model/state';
import AudioPlayerStyles from './AudioPlayerStyles';
import FullScreenAudioPlayer from './FullScreenAudioPlayer';
import { AudioUtils } from '../../utils/AudioUtils';
import { audio } from '../../store/reducers';

export interface AudioPlayerProps extends WithStyles<typeof AudioPlayerStyles> {
    audio: Audio;
    togglePlaying: Function;
    playAudio: Function;
    pauseAudio: Function;
    showPlayer: () => void;
    hidePlayer: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    setTrack: (track: number) => void;
    setPlaybackSpeed: (speed: number) => void;
    setSleepTimer: (duration: number) => void;
    clearSleepTimer: () => void;
    openFullscreen: () => void;
    closeFullscreen: () => void;
    updateAudio: (audio: Audio) => void;
    player: PlayerState;
}

export interface AudioPlayerState {
    currentPosition?: number;
    sleepTimer: SleepTimer;
    sleepTimerMinutesLeft: string;
}

export class AudioPlayer extends Component<AudioPlayerProps, AudioPlayerState> {
    audioRef: React.RefObject<HTMLAudioElement>;
    minuteIntervalHandler: NodeJS.Timer;

    readonly state: AudioPlayerState = {
        currentPosition: 0,
        sleepTimer: null,
        sleepTimerMinutesLeft: null,
    };

    constructor(props: AudioPlayerProps) {
        super(props);
        this.audioRef = React.createRef<HTMLAudioElement>(); /** Needs to be done here, not in componentDidMount */
    }

    componentDidMount() {
        const { audio, player } = this.props;
        const { trackList, currentTrack } = audio;
        const track = trackList[currentTrack];
        const audioCurrentTime = track.currentTime || 0;
        this.audioRef.current.currentTime = audioCurrentTime;
        this.setState({ currentPosition: audioCurrentTime });
        this.registerAudioHandlers();
        this.setSleepTimer(player.sleepTimer);
    }
    
    registerAudioHandlers() {
        const { current } = this.audioRef;
        /* this logic could be moved out (redux?) */
        current.onended = (event: Event) => {
            const { audio, nextTrack } = this.props;
            if (audio.currentTrack != audio.trackList.length - 1) {
                nextTrack();
                this.saveAudioMetrics();
            } else {
                this.pause();
                /** TODO: dispatch complete audio action */
            }
        };
        current.ontimeupdate = (event: Event) => {
            const currentTime = current.currentTime;
            if (!current.ended) { /* fixes async problem on ending audio */
                this.setState({ currentPosition: Math.floor(currentTime) });
            }
        };
    }

    componentWillUnmount() {
        this.saveAudioMetrics();
        if (this.minuteIntervalHandler) {
            clearInterval(this.minuteIntervalHandler);
        }
    }

    componentDidUpdate(prevProps: AudioPlayerProps) {
        if (this.audioRef.current.paused && this.props.player.isPlaying) {
            this.play();
        } else if (!this.audioRef.current.paused && !this.props.player.isPlaying) {
            this.pause();
        }
        /** PLAYBACK RATE */
        if (this.audioRef.current.playbackRate !== this.props.player.speed) {
            this.audioRef.current.playbackRate = this.props.player.speed;
        }
        /** SLEEP TIMER UPDATE */
        if (prevProps.player.sleepTimer !== this.props.player.sleepTimer) {
            this.setSleepTimer(this.props.player.sleepTimer);
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
        const { totalProgress } = AudioUtils.getListeningProgress(audio);
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
        this.audioRef.current.currentTime = time;
        this.setState({currentPosition: time});
    };

    decrement30 = () => {
        this.addToCurrentTime(-30);
    };

    increment30 = () => {
        this.addToCurrentTime(30);
    };

    displayAudioTime = () => {
        const { audio } = this.props;
        const { currentTrack, trackList } = audio;
        const track = trackList[currentTrack];
        const { currentPosition } = this.state;
        return `${TimeUtils.secondsToHHMMSS(currentPosition)} / ${TimeUtils.secondsToHHMMSS(track.duration)}`;
    };

    setSleepTimer = (sleepTimer: SleepTimer) => {
        this.setState({ sleepTimer, sleepTimerMinutesLeft: null });
        if (this.minuteIntervalHandler) clearInterval(this.minuteIntervalHandler);
        if (sleepTimer && sleepTimer.duration !== null) {
            this.minuteIntervalHandler = setInterval(() => {
                const millisElapsed = Date.now() - new Date(sleepTimer.dateSet).getTime();
                const durationMillis = sleepTimer.duration * TimeUtils.MINUTE_MILLIS;
                if (millisElapsed >= durationMillis) {
                    clearInterval(this.minuteIntervalHandler);
                    this.setState({ sleepTimerMinutesLeft: null });
                    this.props.clearSleepTimer();
                } else {
                    const millisRemaining = durationMillis - millisElapsed;
                    const sleepTimerMinutesLeft = TimeUtils.secondsToHHMMSS(millisRemaining / 1000);
                    this.setState({ sleepTimerMinutesLeft });
                }
            }, 1000);
        }
    };

    render() {
        const {
            classes,
            player,
            audio,
            hidePlayer,
            openFullscreen,
            closeFullscreen,
            nextTrack,
            previousTrack,
            setTrack,
            setPlaybackSpeed,
            setSleepTimer,
        } = this.props;
        const { sleepTimerMinutesLeft } = this.state;
        const currentTrack = audio.trackList[audio.currentTrack];
        return (
            audio && (
                <AppBar
                    position="fixed"
                    color="primary"
                    className={classes.audioPlayerBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.playerTextContainer}>
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
                                { `Chapter ${audio.currentTrack + 1}` }
                            </Typography>
                        </div>
                            <div>
                                <IconButton
                                    color="inherit"
                                    onClick={this.togglePlaying}
                                >
                                    {player.isPlaying ? (
                                        <PauseSharp />
                                        ) : (
                                            <PlayArrowSharp />
                                            )}
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
                            </div>
                    </Toolbar>
                    {this.audioRef.current && <FullScreenAudioPlayer
                        onClose={closeFullscreen}
                        onOpen={openFullscreen}
                        nextTrack={nextTrack}
                        previousTrack={previousTrack}
                        setTrack={setTrack}
                        setPlaybackSpeed={setPlaybackSpeed}
                        playbackSpeed={player.speed}
                        setSleepTimer={setSleepTimer}
                        sleepTimer={player.sleepTimer}
                        sleepTimerMinutesLeft={sleepTimerMinutesLeft}
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
