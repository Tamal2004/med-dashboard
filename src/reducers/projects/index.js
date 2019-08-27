// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, LIST_PROJECTS, LIST_PROJECT_CLIENTS } from 'actionTypes';

const projectsReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case LIST_PROJECT_CLIENTS: {
            return isSuccess ? { ...state, clients: payload } : state;
        }

        case LIST_PROJECTS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        default: {
            return state;
        }
    }
};

export { projectsReducer as default, projectsReducer };