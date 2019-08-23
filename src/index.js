import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Amplify from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';

// Local
import config from './aws-exports';
import App from './App';
import store from 'store';
import * as serviceWorker from './serviceWorker';
import startServices from 'services';
import enhanceProtypes from 'libs/prototypeEnhancers';

Amplify.configure(config); // Configure Amplify
PubSub.configure(config);

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
