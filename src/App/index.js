import React, { Component } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
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
import { Notification } from 'components';
import { setAuthUserInfo, getAuthUserInfo } from 'actions';
import { history } from 'libs/history';
import App from './App';

Auth.configure(config);
API.configure(config);

class IndexApp extends Component {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signIn'];
    }

    render() {
        const composePath = () => {
            const path = history.location.pathname;
            let authState;

            if (path === '/application') {
                authState = 'signUp';
            } else if (path === '/') {
                authState = 'signIn';
                history.push('/');
            }

            return authState;
        };

        const { setAuthUserInfo } = this.props;
        return (
            <Router history={history}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Authenticator
                        authState={composePath()}
                        amplifyConfig={config}
                        onStateChange={authState => {
                            if (authState === 'signUp')
                                history.push('/application');
                            return (
                                authState === 'signedIn' && setAuthUserInfo()
                            );
                        }}
                        hide={[
                            Greetings,
                            ConfirmSignIn,
                            SignUp,
                            Loading,
                            TOTPSetup
                        ]}
                    >
                        <OpenTesterForm override={'SignUp'} />
                        <App />
                    </Authenticator>
                    <Notification />
                </MuiThemeProvider>
            </Router>
        );
    }
}

const mapDispatch = {
    setAuthUserInfo,
    getAuthUserInfo
};

export default connect(
    null,
    mapDispatch
)(IndexApp);
