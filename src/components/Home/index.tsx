import Home, { StateProps, DispatchProps } from './Home';
import { AudioBook, Audio } from '../../model/audio';
import { togglePlaying, setAudio, pauseAudio } from '../../store/actions/AudioPlayer';
import { fetchUserAudio, updateAudio, deleteAudio } from '../../store/actions/Audio';
import { connect } from 'react-redux';
import { ReduxState } from '../../model/state';
import { applyUserThemePreferences, changePassword, logout } from '../../store/actions/User';
import { uiHideBanner, uiToggleTheme } from "../../store/actions/Ui";

export const mapStateToProps = (state: ReduxState): StateProps => {
    return {
        ui: state.ui,
        audio: state.audio,
        player: state.player,
        userState: state.user
    };
};

export const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        playAudio: (audio: AudioBook) => dispatch(setAudio(audio)),
        pauseAudio: () => dispatch(pauseAudio()),
        getUserAudio: (userId: string) => dispatch(fetchUserAudio(userId)),
        updateAudio: (audio: AudioBook) => dispatch(updateAudio(audio)),
        deleteAudio: (audio: Audio) => dispatch(deleteAudio(audio)),
        logout: () => dispatch(logout()),
        changePassword: (password: string) => dispatch(changePassword(password)),
        toggleTheme: () => dispatch(uiToggleTheme()),
        closeBanner: () => dispatch(uiHideBanner(null)),
        applyTheme: () => dispatch(applyUserThemePreferences())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
