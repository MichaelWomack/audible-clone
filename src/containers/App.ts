import App from '../components/App';
import { ReduxState } from '../model/state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/User';

const mapStateToProps = (state: ReduxState) => ({
    user: state.user.user,
    themeOptions: state.ui.themeOptions
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (user: firebase.User) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);