// Local
import initialState from './initialState';

// Action Types
import { SET_AUTH_USER_INFO } from 'actionTypes';

const authReducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case SET_AUTH_USER_INFO: {
            const { 'custom:testerId': testerId, email, name } = payload;
            return {
                ...state,
                isTester: !!testerId,
                testerId,
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
