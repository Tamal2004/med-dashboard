import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';

import config from './aws-exports';

// Local
import * as serviceWorker from './serviceWorker';
import startServices from 'services';
import enhanceProtypes from 'libs/prototypeEnhancers';

Amplify.configure(config); // Configure Amplify
PubSub.configure(config);

enhanceProtypes();
startServices();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
