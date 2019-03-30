import * as React from 'react';
import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../containers/Login';
import Home from '../../containers/Home';
import SignUp from '../../containers/SignUp';
import ProtectedRoute from '../ProtectedRoute';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { authService } from '../../services';
import Banner from "../Banner";
import { AudioState, UiState } from "../../model/state";
import NavBar from "../NavBar";

interface Props {
    user: firebase.User,// could probably remove?
    setUser: (user: firebase.User) => void;
    logout: () => void;
    themeOptions: ThemeOptions,
    ui: UiState;
    audio: AudioState;
    closeBanner: () => void;
}

class App extends Component<Props, {}> {

    componentDidMount() {
        authService.getAuth().onAuthStateChanged((user: firebase.User) => {
            console.log('AUTH STATE CHANGE user: => ', user);
            const partialUser = { ...user };
            delete partialUser.providerData;
            this.props.setUser(user);
        });
    }

    render() {
        const { user, themeOptions, ui, audio, logout, closeBanner } = this.props;
        const theme: Theme = createMuiTheme(themeOptions);
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
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
                            <Route path="/login" component={Login}/>
                            <Route path="/signup" component={SignUp}/>
                            <ProtectedRoute path="/home" user={user} component={Home}/>
                            <Redirect from="/" to="/home"/>
                        </Switch>
                    </Fragment>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
