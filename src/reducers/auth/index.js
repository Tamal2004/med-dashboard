// Local
import initialState from './initialState';

// Action Types
import { SET_AUTH_USER_INFO, UPDATE_USER_INFO, LOGOUT } from 'actionTypes';

const authReducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case SET_AUTH_USER_INFO: {
            const {
                'custom:testerId': testerId,
                'custom:firstName': firstName,
                'custom:surname': surname,
                email
            } = payload;
            return {
                ...state,
                isTester: !!testerId,
                testerId: testerId,
                email,
                firstName,
                surname,
                name: `${firstName ? firstName : '-'} ${
                    surname ? surname : '-'
                }`
            };
        }

        case UPDATE_USER_INFO: {
            const { firstName, surname } = payload;
            return {
                ...state,
                firstName,
                surname,
                name: `${firstName ? firstName : '-'} ${
                    surname ? surname : '-'
                }`
            };
        }

        case LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export { authReducer as default, authReducer };
