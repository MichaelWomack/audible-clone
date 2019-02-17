import * as React from 'react';
import { Component, Fragment } from 'react';
import {
    withRouter,
    RouteComponentProps,
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar';
import AudioPlayer from '../../containers/AudioPlayer';
import AddAudio from '../../containers/AddAudio';
import AudioList from '../AudioList';
import HomeStyles from './HomeStyles';
import { Audio, AudioBook, AudioLibraryFilter } from '../../model/audio';
import Snackbar from '@material-ui/core/Snackbar';
import { PlayerState, UiState, AudioState } from '../../model/state';
import Slide from '@material-ui/core/Slide';
import GitHubButton from '../GitHubButton';

export interface HomeProps extends WithStyles<typeof HomeStyles>, RouteComponentProps {
    playAudio: (audio: AudioBook) => void;
    pauseAudio: () => void;
    updateAudio: (audio: Audio) => void;
    deleteAudio: (audio: Audio) => void;
    toggleFavorite: (audio: Audio) => void;
    logout: () => void;
    user: firebase.User;
    getUserAudio: Function;
    player: PlayerState;
    ui: UiState;
    audio: AudioState;
}

export class Home extends Component<HomeProps, {}> {
    componentDidMount() {
        this.getAudio();
    }

    getAudio = () => {
        const userId = this.props.user.uid;
        this.props.getUserAudio(userId);
    };

    render() {
        const {
            classes,
            match,
            history,
            audio,
            player,
            ui,
            updateAudio,
            deleteAudio,
            playAudio,
            pauseAudio,
            logout,
        } = this.props;
        const selectedAudioId = player.audio ? player.audio.id : null;
        return (
            <Fragment>
                <NavBar
                    logout={logout}
                    isLoading={ui.isLoading}
                    isUploading={audio.isUploading}
                    uploadProgress={audio.uploadProgress}
                />
                <div className={classes.container}>
                    {!history.location.pathname.endsWith('add-audio') && (
                        <Link to={`${match.path}/add-audio`}>
                            <Button
                                variant="fab"
                                color="secondary"
                                aria-label="Add"
                                className={classes.addButton}
                            >
                                <AddIcon />
                            </Button>
                        </Link>
                    )}
                    <Route
                        exact
                        path={`${match.path}`}
                        render={props => (
                            !ui.isLoading ? 
                            <AudioList
                                audioList={Object.values(audio.library)}
                                updateAudio={updateAudio}
                                deleteAudio={deleteAudio}
                                playAudio={playAudio}
                                pauseAudio={pauseAudio}
                                isPlaying={player.isPlaying}
                                selectedAudioId={selectedAudioId}
                                filter={AudioLibraryFilter.ALL}
                            /> : null
                        )}
                    />
                    <Route
                        path={`${match.path}/add-audio`}
                        component={AddAudio}
                    />
                </div>

                <Slide
                    direction="up"
                    in={player.isShowing}
                    mountOnEnter
                    unmountOnExit
                >
                    <AudioPlayer />
                </Slide>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={ui.snackbarOpen}
                    message={ui.snackbarMessage}
                />
                <div className={classes.githubButtonContainer}>
                    <GitHubButton/>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(withStyles(HomeStyles)(Home));
