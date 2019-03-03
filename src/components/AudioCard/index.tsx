import * as React from 'react';
import { Component, Fragment, SyntheticEvent } from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share'
import Chip from '@material-ui/core/Chip';
import AudioInfoDialog from '../AudioInfoDialog';
import Menu from '@material-ui/core/Menu';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ConfirmationDialog from './ConfirmationDialog';

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

class AudioCard extends Component<AudioCardProps, AudioCardState> {

    readonly state: AudioCardState = {
        isFavorite: this.props.audio.favorite,
        showInfoDialog: false,
        moreOptionsAnchorEl: null,
        showDeleteDialog: false,
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

    replayAudio = () => {
        const { audio, playAudio, updateAudio } = this.props;
        /** TODO: should this be a redux action? */
        audio.currentTrack = 0;
        audio.currentTime = 0;
        audio.totalProgress = 0;
        updateAudio(audio);
        playAudio(audio);
    };

    openMoreOptionsMenu = (event: SyntheticEvent<HTMLElement>) => {
        this.setState({ moreOptionsAnchorEl: event.currentTarget });
    }

    closeMoreOptionsMenu = () => {
        this.setState({ moreOptionsAnchorEl:  null });
    }

    openDialog = () => {
        this.setState({ showInfoDialog: true })
    }

    closeInfoDialog = () => {
        this.setState({ showInfoDialog: false })
    }

    openDeleteDialog = () => {
        this.setState({ showDeleteDialog: true });
    }

    closeDeleteDialog = () => {
        this.setState({ showDeleteDialog: false })
    }

    deleteAudio = () => {
        const { audio, deleteAudio } = this.props;
        deleteAudio(audio);
        this.closeDeleteDialog();
    }

    render() {
        const { classes, audio, isCurrentlyPlaying, pauseAudio } = this.props;
        const { totalProgress, totalDuration } = audio;//AudioUtils.getListeningProgress(audio);
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
                                {   isCurrentlyPlaying && (percentDone !== 100) && <PauseIcon fontSize="large" onClick={pauseAudio} /> }
                                {   !isCurrentlyPlaying && (percentDone !== 100) && <PlayArrowIcon fontSize="large" onClick={this.playAudio}/> }
                                {   percentDone === 100 && <ReplayIcon fontSize="large" onClick={this.replayAudio} /> }
                                </IconButton>
                                <IconButton
                                    aria-label="Play/pause"
                                    onClick={this.toggleFavorite}
                                >
                                {audio.favorite ? <Favorite color="secondary" /> : <FavoriteBorder /> }
                                </IconButton>
                                <IconButton>
                                    <InfoOutlinedIcon onClick={this.openDialog}/>
                                </IconButton>
                                <IconButton onClick={this.openDeleteDialog}>
                                    <DeleteIcon />
                                </IconButton>
                                {/* <IconButton onClick={this.openMoreOptionsMenu}>
                                    <MoreVertIcon />
                                </IconButton> */}
                            </div>
                    </div>
                </Card>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.moreOptionsAnchorEl}
                    open={Boolean(this.state.moreOptionsAnchorEl)}
                    onClose={this.closeMoreOptionsMenu}
                >
                    {/* <MenuItem onClick={this.closeMoreOptionsMenu}> */}
                        <IconButton onClick={this.closeMoreOptionsMenu}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton onClick={this.closeMoreOptionsMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    {/* </MenuItem> */}
                </Menu>
                <ConfirmationDialog 
                    open={this.state.showDeleteDialog}
                    audio={this.props.audio}
                    confirm={this.deleteAudio}
                    cancel={this.closeDeleteDialog}
                />
                <AudioInfoDialog 
                    audio={this.props.audio}
                    closeDialog={this.closeInfoDialog}
                    showInfoDialog={this.state.showInfoDialog}
                />
            </Fragment>
        );
    }
}

export default withStyles(AudioCardStyles)(AudioCard);
