import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// Local
import App from 'App';
import { history } from 'routes';

const Root = () => {
    return (
        //<Provider store={{}}>
            <Router history={history}>
                <App />
            </Router>
        //</Provider>
    );
};

export default Root;
