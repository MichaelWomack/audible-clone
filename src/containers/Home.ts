import Home from '../components/Home';
import { AudioBook } from '../model/audio';
import { togglePlaying, setAudio, pauseAudio } from '../store/actions/AudioPlayer';
import { fetchUserAudio, updateAudio } from '../store/actions/Audio';
import { connect } from 'react-redux';
import { ReduxState } from '../model/state';
import { logout } from '../store/actions/User';

export const mapStateToProps = (state: ReduxState) => {
    return {
        ui: state.ui,
        audio: state.audio,
        player: state.player,
        user: state.user.user
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        togglePlaying: () => dispatch(togglePlaying()),
        playAudio: (audio: AudioBook) => dispatch(setAudio(audio)),
        pauseAudio: () => dispatch(pauseAudio()),
        getUserAudio: (userId: string) => dispatch(fetchUserAudio(userId)),
        updateAudio: (audio: AudioBook) => dispatch(updateAudio(audio)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
