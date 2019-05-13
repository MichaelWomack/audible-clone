import * as React from 'react';
import { Component, Fragment } from 'react';
import { Link, Route, RouteComponentProps, withRouter, } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AudioPlayer from '../AudioPlayer';
import AddAudioFlow from '../AddAudioFlow';
import Settings from "../Settings";
import AudioList from '../AudioList';
import HomeStyles from './HomeStyles';
import GitHubButton from '../GitHubButton';
import { AudioState, PlayerState, UiState, UserState } from '../../model/state';
import { Audio } from '../../model/audio';
import { Routes, ThemeType } from '../../config/constants';

export interface StateProps {
    ui: UiState
    audio: AudioState,
    player: PlayerState,
    userState: UserState
}

export interface DispatchProps {
    togglePlaying: () => void;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
    getUserAudio: (userId: string) => void;
    updateAudio: (audio: Audio) => void;
    deleteAudio: (audio: Audio) => void;
    logout: () => void;
    changePassword: (password: string) => void;
    toggleTheme: () => void;
    closeBanner: () => void;
    applyTheme: () => void;
}

export interface HomeProps extends WithStyles<typeof HomeStyles>, RouteComponentProps, StateProps, DispatchProps {}

export class Home extends Component<HomeProps, {}> {
    componentDidMount() {
        this.getAudio();
    }

    getAudio = () => {
        const { user: { uid } } = this.props.userState;
        this.props.getUserAudio(uid);
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
            changePassword,
            toggleTheme,
            applyTheme,
        } = this.props;
        const selectedAudioId = player.audio ? player.audio.id : null;
        return (
            <Fragment>
                <div className={classes.container}>
                    {history.location.pathname.endsWith('home') && (
                        <Link to={Routes.ADD_AUDIO}>
                            <Button
                                variant="fab"
                                color="secondary"
                                aria-label="Add"
                                className={classes.addButton}
                            >
                                <AddIcon/>
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
                                /> : null
                        )}
                    />
                    <Route
                        path={Routes.ADD_AUDIO}
                        component={AddAudioFlow}
                    />
                    <Route
                        path={Routes.SETTINGS}
                        render={props => <Settings
                            themeType={ui.themeOptions.palette.type as ThemeType}
                            applyTheme={applyTheme}
                            toggleTheme={toggleTheme}
                            changePassword={changePassword}
                        />}
                    />
                </div>
                <Slide
                    direction="up"
                    in={player.isShowing}
                    mountOnEnter
                    unmountOnExit
                >
                    <AudioPlayer/>
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
