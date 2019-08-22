// Local
import initialState from './initialState';

// Action Types
import { SET_AUTH_USER_INFO } from 'actionTypes';

const authReducer = (state = initialState, { type, payload, ...action }) => {
	console.log('authReducer', type);
	switch (type) {
		case SET_AUTH_USER_INFO: {
			const { 'custom:testerId': isTester, email, name } = payload;
			return {
				...state,
				isTester: !!isTester,
				email,
				name
			};
		}

		default: {
			return state;
		}
	}
};

export { authReducer as default, authReducer };
