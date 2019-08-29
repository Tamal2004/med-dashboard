// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    LIST_CLIENTS,
    CREATE_CLIENT,
    UPDATE_CLIENT
} from 'actionTypes';

const clientsReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case CREATE_CLIENT: {
            return isSuccess
                ? {
                      ...state,
                      list: [...state.list, payload]
                  }
                : state;
        }

        case UPDATE_CLIENT: {
            return isSuccess
                ? {
                      ...state,
                      list: state.list.map(client =>
                          client.id === payload.id ? payload : client
                      )
                  }
                : state;
        }

        case LIST_CLIENTS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        default: {
            return state;
        }
    }
};

export { clientsReducer as default, clientsReducer };
