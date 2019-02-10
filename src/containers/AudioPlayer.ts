import AudioPlayer from '../components/AudioPlayer';
import {
    togglePlaying,
    showPlayer,
    hidePlayer,
    playAudio,
    pauseAudio,
    openFullscreen,
    closeFullscreen,
} from '../store/actions/AudioPlayer';
import { ReduxState } from '../model/state';
import { connect } from 'react-redux';
import { updateAudio } from '../store/actions/Audio';
import { Audio } from '../model/audio';

export const mapStateToProps = (state: ReduxState) => ({
    isPlaying: state.player.isPlaying,
    isShowing: state.player.isShowing,
    fullscreen: state.player.fullscreen,
    audio: state.player.audio,
    player: state.player,
});

export const mapDispatchToProps = (dispatch: Function) => ({
    togglePlaying: () => dispatch(togglePlaying()),
    updateAudio: (audio: Audio) => dispatch(updateAudio(audio)),
    playAudio: () => dispatch(playAudio()),
    pauseAudio: () => dispatch(pauseAudio()),
    showPlayer: () => dispatch(showPlayer()),
    hidePlayer: () => dispatch(hidePlayer()),
    openFullscreen: () => dispatch(openFullscreen()),
    closeFullscreen: () => dispatch(closeFullscreen()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AudioPlayer);
