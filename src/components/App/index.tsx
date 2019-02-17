import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../../containers/Login';
import Home from '../../containers/Home';
import SignUp from '../SignUp';
import ProtectedRoute from '../ProtectedRoute';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { authService } from '../../services';

interface Props {
    user: firebase.User,// could probably remove?
    themeOptions: ThemeOptions,
    setUser: (user: firebase.User) => void;
}

class App extends Component<Props, {}> {

    componentDidMount() {
        authService.getAuth().onAuthStateChanged((user: firebase.User) => {
            console.log('AUTH STATE CHANGE user: => ', user);
            this.props.setUser(user)
        });
    }

    render() {
        const { user, themeOptions } = this.props;
        const theme: Theme = createMuiTheme(themeOptions);
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        {/* <ProtectedRoute path="/settings" user={user} component={} /> */}
                        <ProtectedRoute path="/home" user={user} component={Home} />
                        <ProtectedRoute path="/" user={user} component={Home} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
