import Login from './Login';
import { login, loginWithAuthProvider } from '../../store/actions/User';
import { connect } from 'react-redux';
import { ReduxState } from '../../model/state';
import { auth } from 'firebase';

const mapStateToProps = (state: ReduxState) => ({
    ui: state.ui,
    user: state.user.user
});

const mapDispatchToProps = (dispatch: Function) => ({
    login: (email: string, password: string, callback: Function) => dispatch(login(email, password, callback)),
    loginWithAuthProvider: (authProvider: auth.AuthProvider, callback: Function) => dispatch(loginWithAuthProvider(authProvider, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);