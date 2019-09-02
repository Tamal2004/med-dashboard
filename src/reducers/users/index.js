// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    LIST_USERS,
    CREATE_USER,
    UPDATE_USER,
    REMOVE_USER
} from 'actionTypes';

const usersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        // case CREATE_USER: {
        //     return isSuccess
        //         ? {
        //               ...state,
        //               list: [...state.list, payload]
        //           }
        //         : state;
        // }
        // case UPDATE_USER: {
        //     return isSuccess
        //         ? {
        //               ...state,
        //               list: state.list.map(client =>
        //                   client.id === payload.id ? payload : client
        //               )
        //           }
        //         : state;
        // }

        case LIST_USERS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        default: {
            return state;
        }
    }
};

export { usersReducer as default, usersReducer };
