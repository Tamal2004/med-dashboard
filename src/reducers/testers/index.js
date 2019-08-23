// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, LIST_TESTERS } from 'actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    switch (type) {
        case LIST_TESTERS: {
            if (async === SUCCESS) return { ...state, list: payload };
            return state;
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
