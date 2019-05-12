import * as React from 'react';
import { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import Banner from "../Banner";
import Login from '../Login';
import Home from '../../containers/Home';
import SignUp from '../SignUp'
import ProtectedRoute from '../ProtectedRoute';
import { authService } from '../../services';
import { AudioState, ReduxState, UiState, UserState } from "../../model/state";
import NavBar from "../NavBar";
import { Routes } from "../../config/constants";
import { logout, setUser } from "../../store/actions/User";
import { uiHideBanner } from "../../store/actions/Ui";

export interface StateProps {
    userState: UserState;
    ui: UiState;
    audio: AudioState;
}

export interface DispatchProps {
    setUser: (user: firebase.User) => void;
    logout: () => void;
    closeBanner: () => void;
}

export interface AppProps extends StateProps, DispatchProps {}

class App extends Component<AppProps, {}> {

    componentDidMount() {
        authService.getAuth().onAuthStateChanged((user: firebase.User) => {
            const partialUser = { ...user };
            delete partialUser.providerData;
            this.props.setUser(user);
        });
    }

    render() {
        const { userState: { user }, ui, audio, logout, closeBanner } = this.props;
        const theme: Theme = createMuiTheme(ui.themeOptions);
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <CssBaseline>
                        <Fragment>
                            <NavBar
                                logout={logout}
                                isLoading={ui.isLoading}
                                isUploading={audio.isUploading}
                                uploadProgress={audio.uploadProgress}
                                user={user}
                            />
                            <Banner
                                variant={ui.bannerType}
                                open={ui.bannerOpen}
                                message={ui.bannerMessage}
                                onClose={closeBanner}
                            />
                            <Switch>
                                <Route path={Routes.LOGIN} component={Login}/>
                                <Route path={Routes.SIGNUP} component={SignUp}/>
                                <ProtectedRoute path={Routes.HOME} user={user} component={Home}/>
                                <Redirect from="/" to={Routes.HOME}/>
                            </Switch>
                        </Fragment>
                    </CssBaseline>
                </Router>
            </MuiThemeProvider>
        );
    }
}

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
