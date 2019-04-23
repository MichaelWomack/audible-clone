import * as React from 'react';
import { Component, Fragment } from 'react';
import { Audio } from '../../model/audio';
import AudioCardStyles from './AudioCardStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import AudioInfoDialog from './AudioInfoDialog';
import ConfirmationDialog from './ConfirmationDialog';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface AudioCardProps extends WithStyles<typeof AudioCardStyles> {
    audio: Audio;
    updateAudio: Function;
    deleteAudio: (audio: Audio) => void;
    isCurrentlyPlaying: boolean;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
}

export interface AudioCardState {
    isFavorite: boolean;
    showInfoDialog: boolean;
    showDeleteDialog: boolean;
    moreOptionsAnchorEl: HTMLElement;
}

export class AudioCard extends Component<AudioCardProps, AudioCardState> {

    state: AudioCardState = {
        isFavorite: this.props.audio.favorite,
        showInfoDialog: false,
        moreOptionsAnchorEl: null,
        showDeleteDialog: false,
    };

    toggleFavorite = () => {
        const { audio, updateAudio } = this.props;
        audio.favorite = !audio.favorite;
        this.setState({ isFavorite: audio.favorite }, () => updateAudio(audio));
    };

    playAudio = () => {
        const { audio, playAudio } = this.props;
        playAudio(audio); // also sets the currently playing audio object in redux
    };

    replayAudio = () => {
        const { audio, playAudio, updateAudio } = this.props;
        audio.currentTrack = 0;
        audio.currentTime = 0;
        audio.totalProgress = 0;
        updateAudio(audio);
        playAudio(audio);
    };

    toggleInfoDialog = () => {
        this.setState(prevState => ({ showInfoDialog: !prevState.showInfoDialog }));
    };

    toggleDeleteDialog = () => {
        this.setState(prevState => ({ showDeleteDialog: !prevState.showDeleteDialog }));
    };

    deleteAudio = () => {
        const { audio, deleteAudio } = this.props;
        deleteAudio(audio);
        this.setState({ showDeleteDialog: false });
    };

    render() {
        const { classes, audio, isCurrentlyPlaying, pauseAudio } = this.props;
        const { totalProgress, totalDuration } = audio;
        const percentDone = (totalProgress / totalDuration) * 100;
        const chipLabel = `${Math.floor(percentDone)}% complete`;
        return (
            <Fragment>
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
                                {isCurrentlyPlaying && (percentDone !== 100) &&
                                <PauseIcon fontSize="large" onClick={pauseAudio}/>}
                                {!isCurrentlyPlaying && (percentDone !== 100) &&
                                <PlayArrowIcon fontSize="large" onClick={this.playAudio}/>}
                                {percentDone === 100 && <ReplayIcon fontSize="large" onClick={this.replayAudio}/>}
                            </IconButton>
                            <IconButton
                                aria-label="favorite"
                                onClick={this.toggleFavorite}
                                data-test="toggle-favorite"
                            >
                                {audio.favorite ? <Favorite color="secondary"/> : <FavoriteBorder/>}
                            </IconButton>
                            <IconButton
                                onClick={this.toggleInfoDialog}
                                data-test="open-info-dialog"
                            >
                                <InfoOutlinedIcon />
                            </IconButton>
                            <IconButton
                                onClick={this.toggleDeleteDialog}
                                data-test="open-delete-dialog"
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                </Card>
                <ConfirmationDialog
                    open={this.state.showDeleteDialog}
                    audio={this.props.audio}
                    confirm={this.deleteAudio}
                    cancel={this.toggleDeleteDialog}
                />
                <AudioInfoDialog
                    audio={this.props.audio}
                    closeDialog={this.toggleInfoDialog}
                    showInfoDialog={this.state.showInfoDialog}
                />
            </Fragment>
        );
    }
}

export default withStyles(AudioCardStyles)(AudioCard);
