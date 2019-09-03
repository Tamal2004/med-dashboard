// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, LIST_USERS, CREATE_USER, REMOVE_USER } from 'actionTypes';

const usersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case CREATE_USER: {
            return isSuccess
                ? {
                      ...state,
                      list: [...state.list, payload]
                  }
                : state;
        }
        case REMOVE_USER: {
            return isSuccess
                ? {
                      ...state,
                      list: state.list.filter(user => user.id !== payload.id)
                  }
                : state;
        }

        case LIST_USERS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        default: {
            return state;
        }
    }
};

export { usersReducer as default, usersReducer };
