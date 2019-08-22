// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, FETCH_TESTERS_HOME } from 'store/actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    switch (type) {
        case FETCH_TESTERS_HOME: {
            if (async === SUCCESS) return { ...state, home: payload };
            return state;
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
