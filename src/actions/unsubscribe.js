import { history } from 'libs/history';

export const unsubscribe = payload => {
	return async dispatch => {
		console.log('action/unsubscribe => payload => ', payload);
		//on success push to home
		// history.push("/")
	};
};
