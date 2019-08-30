// Local
import initialState from './initialState';

// Action Types
import { SET_AUTH_USER_INFO } from 'actionTypes';

const authReducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case SET_AUTH_USER_INFO: {
            const {
                'custom:testerId': testerId,
                email,
                family_name,
                given_name
            } = payload;
            return {
                ...state,
                isTester: !!testerId,
                testerId: !!testerId
                    ? '3a8cf4b5-433a-4ab9-b706-5b153c97d0cb'
                    : null,
                email,
                name: family_name + ' ' + given_name
            };
        }

        default: {
            return state;
        }
    }
};

export { authReducer as default, authReducer };
