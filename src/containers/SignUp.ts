import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { signUp } from '../store/actions/User';

export const mapDispatchToProps = (dispatch: Function) => ({
    signUp: (email: string, password: string, callback: Function) => dispatch(signUp(email, password, callback))
});

export default connect(null, mapDispatchToProps)(SignUp);