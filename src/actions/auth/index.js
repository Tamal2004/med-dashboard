import { Auth } from 'aws-amplify';

import { SET_AUTH_USER_INFO } from 'actionTypes';

const getUser = () => {
	return Auth.currentAuthenticatedUser({
		bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	})
		.then(({ attributes }) => ({
			attributes
		}))
		.catch(err => console.log(err));
};

const signUp = () => {
	console.log('SIGN UP');
	Auth.signUp({
		username: 'report.nabil@gmail.com',
		password: 'password',
		attributes: {
			name: 'report.nabil@gmail.com',
			email: 'report.nabil@gmail.com',
			'custom:testerId': '123'
		}
	})
		.then(data => console.log(data))
		.catch(err => console.log(err));
};

export const setAuthUserInfo = () => {
	return async dispatch => {
		const info = await getUser();
		Object.prototype.hasOwnProperty.call(info, 'attributes') &&
			dispatch({
				type: SET_AUTH_USER_INFO,
				payload: info.attributes
			});
	};
};
