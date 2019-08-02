import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import startServices from 'services';
import enhanceProtypes from 'libs/prototypeEnhancers';


import awsconfig from './aws-exports';


API.configure(awsconfig);
PubSub.configure(awsconfig);


enhanceProtypes();
startServices();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
