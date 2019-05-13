import { connect } from 'react-redux';
import SignUp from './SignUp';
import { signUp, signUpWithAuthProvider } from '../../store/actions/User';

export const mapDispatchToProps = (dispatch: Function) => ({
    signUp: (email: string, password: string, callback: Function) => dispatch(signUp(email, password, callback)),
    signUpWithAuthProvider: (authProvider: firebase.auth.AuthProvider, callback: Function) => dispatch(signUpWithAuthProvider(authProvider, callback))
});

export default connect(null, mapDispatchToProps)(SignUp);