// Local
import initialState from './initialState';

// Action Types
import { SET_NOTITICATION, RESET_NOTITICATION } from 'actionTypes';

const notificationReducer = (
    state = initialState,
    { type, payload, ...action }
) => {
    switch (type) {
        case SET_NOTITICATION: {
            const { type, message } = payload;
            return {
                ...state,
                type,
                message
            };
        }
        case RESET_NOTITICATION: {
            return {
                ...state,
                type: null,
                message: ''
            };
        }
        default: {
            return state;
        }
    }
};

export { notificationReducer as default, notificationReducer };
