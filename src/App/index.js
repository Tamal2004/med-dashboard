import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// Material
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Local
import theme from 'components/theme';
import store from 'store';
import { history } from 'libs';
import App from './App';

const IndexApp = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />

                    <App />
                </MuiThemeProvider>
            </Router>
        </Provider>
    );
};

export default IndexApp;
