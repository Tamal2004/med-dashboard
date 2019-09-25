import React, { Component } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';

// AWS
import config from '../aws-exports';
import { I18n } from '@aws-amplify/core';
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
import { Background } from 'assets';
import App from './App';

Auth.configure(config);
API.configure(config);

const authScreenLabels = {
    en: {
        Username: 'Email Address',
        'Enter your username': 'Enter your email address'
    }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

const test = ({ children }) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                zIndex: 0,
                top: 0,
                left: 0,
                backgroundImage: `url(${Background})`,
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {children}
        </div>
    );
};

class IndexApp extends Component {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signIn'];
    }

    render() {
        const composePath = () => {
            const path = history.location.pathname;
            let authState;

            if (path === '/application' || path === '/unsubscribe') {
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
                        container={test}
                        authState={composePath()}
                        amplifyConfig={config}
                        onStateChange={authState => {
                            if (authState === 'signUp') {
                                const path = history.location.pathname;
                                if (path === '/application' || path === '/')
                                    history.push('/application');
                            }
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
