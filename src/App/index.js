import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// AWS
import config from '../aws-exports';
import {
    Authenticator,
    Greetings,
    ConfirmSignIn,
    SignUp,
    TOTPSetup,
    Loading
} from 'aws-amplify-react';

import { OpenTesterForm } from 'views';

// Material
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Local
import theme from 'components/theme';
import store from 'store';
import { history } from 'libs/history';
import App from './App';

class IndexApp extends Component {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signIn'];
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Authenticator
                            amplifyConfig={config}
                            authState={
                                history.location.pathname.trim() ===
                                '/tester-application-form'
                                    ? 'signUp'
                                    : 'signIn'
                            }
                            hide={[
                                Greetings,
                                ConfirmSignIn,
                                SignUp,
                                TOTPSetup,
                                Loading
                            ]}
                        >
                            <OpenTesterForm override={'SignUp'} />
                            <App />
                        </Authenticator>
                    </MuiThemeProvider>
                </Router>
            </Provider>
        );
    }
}

export default IndexApp;
