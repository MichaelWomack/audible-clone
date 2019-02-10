import * as React from 'react';
import { Component } from 'react';
import { Audio } from '../../model/audio';
import AudioCardStyles from './AudioCardStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Chip from '@material-ui/core/Chip';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface AudioCardProps extends WithStyles<typeof AudioCardStyles> {
    audio: Audio;
    updateAudio: Function;
    isCurrentlyPlaying: boolean;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
}

export interface AudioCardState {
    isFavorite: boolean;
}

class AudioCard extends Component<AudioCardProps, AudioCardState> {

    audioRef: React.RefObject<HTMLAudioElement>;

    readonly state: AudioCardState = {
        isFavorite: this.props.audio.favorite
    }

    toggleFavorite = () => {
        const { audio, updateAudio } = this.props;
        audio.favorite = !audio.favorite;
        this.setState({ isFavorite: audio.favorite }, () => updateAudio(audio));
    }

    playAudio = () => {
        const { audio, playAudio } = this.props;
        playAudio(audio); // also sets the currently playing audio object in redux
    }

    render() {
        const { classes, audio, isCurrentlyPlaying, pauseAudio } = this.props;
        const { currentTime = 0, duration } = audio;
        const percentDone = (currentTime / duration) * 100;
        const chipLabel = `${Math.floor(percentDone)}% complete`;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={audio.imageUrl}
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1">
                            {audio.title}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {audio.author}
                        </Typography>
                    </CardContent>
                    <Chip
                        label={chipLabel}
                        className={classes.chip}
                        color="secondary"
                    />
                    <div className={classes.controls}>
                        <IconButton aria-label="Play/pause">
                            {   isCurrentlyPlaying ? 
                                <PauseIcon fontSize="large" onClick={pauseAudio} /> :
                                <PlayArrowIcon fontSize="large" onClick={this.playAudio}/>
                            }
                        </IconButton>
                        <IconButton
                            aria-label="Play/pause"
                            onClick={this.toggleFavorite}
                        >
                            {audio.favorite ? (
                                <Favorite color="secondary" />
                            ) : (
                                <FavoriteBorder />
                            )}
                        </IconButton>
                        <IconButton>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </div>
                    <audio ref={this.audioRef} src={audio.downloadUrl} />
                </div>
            </Card>
        );
    }
}

export default withStyles(AudioCardStyles)(AudioCard);
