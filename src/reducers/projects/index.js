// Local
import initialState from './initialState';

// Action Types
import {
    SUCCESS,
    FETCH_PROJECT,
    UPDATE_PROJECT,
    LIST_PROJECTS,
    LIST_PROJECT_CLIENTS,
    LIST_PROJECT_USERS,
    REMOVE_SESSION,
    FETCH_PROJECT_REPORT,
    RESET_PROJECT_REPORT
} from 'actionTypes';

const projectsReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case FETCH_PROJECT: {
            return isSuccess ? { ...state, individual: payload } : state;
        }

        case FETCH_PROJECT_REPORT: {
            return isSuccess ? { ...state, report: payload } : state;
        }

        case RESET_PROJECT_REPORT: {
            return { ...state, report: {} };
        }

        case UPDATE_PROJECT: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          profiles: payload.profiles
                      }
                  }
                : state;
        }

        case LIST_PROJECT_CLIENTS: {
            return isSuccess ? { ...state, clients: payload } : state;
        }

        case LIST_PROJECT_USERS: {
            return isSuccess ? { ...state, users: payload } : state;
        }

        case LIST_PROJECTS: {
            return isSuccess
                ? {
                      ...state,
                      list: payload
                  }
                : state;
        }

        case REMOVE_SESSION: {
            return isSuccess
                ? {
                      ...state,
                      individual: {
                          ...state.individual,
                          sessions: state.individual.sessions.filter(
                              ({ id }) => id !== payload
                          )
                      }
                  }
                : state;
        }

        default: {
            return state;
        }
    }
};

export { projectsReducer as default, projectsReducer };
