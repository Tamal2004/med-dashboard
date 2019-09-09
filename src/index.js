import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Local
import App from './App';
import store from 'store';
import * as serviceWorker from './serviceWorker';
import startServices from 'services';
import enhanceProtypes from 'libs/prototypeEnhancers';

enhanceProtypes();
startServices();

const AppDom = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<AppDom />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
