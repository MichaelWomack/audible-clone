import App, { StateProps, DispatchProps } from '../components/App';
import { ReduxState } from '../model/state';
import { connect } from 'react-redux';
import { logout, setUser } from '../store/actions/User';
import { uiHideBanner } from '../store/actions/Ui';

const mapStateToProps = (state: ReduxState): StateProps => ({
    userState: state.user,
    ui: state.ui,
    audio: state.audio,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    setUser: (user: firebase.User) => dispatch(setUser(user)),
    logout: () => dispatch(logout()),
    closeBanner: () => dispatch(uiHideBanner(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);