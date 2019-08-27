// Local
import initialState from './initialState';

// Action Types
import { SUCCESS, FETCH_TESTER, LIST_TESTERS } from 'actionTypes';

const testersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    const isSuccess = async === SUCCESS;
    switch (type) {
        case FETCH_TESTER: {
            return isSuccess ? { ...state, individual: payload } : state;
        }

        case LIST_TESTERS: {
            return isSuccess ? { ...state, list: payload } : state;
        }

        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
