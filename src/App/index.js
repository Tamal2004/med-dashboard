import React, { Component } from 'react';
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
import { setAuthUserInfo } from 'actions';
import { history } from 'libs/history';
import App from './App';

class IndexApp extends Component {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signIn'];
    }

    render() {
        return (
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
                        onStateChange={authState =>
                            authState === 'signedIn' &&
                            this.props.setAuthUserInfo()
                        }
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
                </MuiThemeProvider>
            </Router>
        );
    }
}

const mapDispatch = {
    setAuthUserInfo
};

export default connect(
    null,
    mapDispatch
)(IndexApp);
