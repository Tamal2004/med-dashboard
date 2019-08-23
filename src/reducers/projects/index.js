// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, FETCH_PROJECT_CLIENTS } from 'actionTypes';

const projectsReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    switch (type) {
        case FETCH_PROJECT_CLIENTS: {
            if (async === SUCCESS) return { ...state, clients: payload };
            return state;
        }

        default: {
            return state;
        }
    }
};

export { projectsReducer as default, projectsReducer };
