// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    LIST_CLIENTS,
    CREATE_CLIENT,
    UPDATE_CLIENT,
    FETCH_CLIENT
} from 'actionTypes';

const clientsReducer = (
    state = initialState,
    { type, payload, async, meta, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case FETCH_CLIENT: {
            return isSuccess
                ? {
                      ...state,
                      individual: payload
                  }
                : state;
        }

        case CREATE_CLIENT: {
            return isSuccess
                ? {
                      ...state,
                      list: [payload, ...state.list]
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
            return {
                ...state,
                ...(isSuccess ? { ...state, list: payload } : {}),
                isSearching: meta.isSearching
            };
        }

        default: {
            return state;
        }
    }
};

export { clientsReducer as default, clientsReducer };
