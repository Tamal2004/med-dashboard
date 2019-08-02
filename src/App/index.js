import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from 'store';
import { history } from 'libs';
import App from './App';

const IndexApp = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	);
};

export default IndexApp;
