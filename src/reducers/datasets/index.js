// Local
import initialState from './initialState';

// Action Types

const datasetsReducer = (
    state = initialState,
    { type, payload, ...action }
) => {
    switch (type) {
        default: {
            return state;
        }
    }
};

export { datasetsReducer as default, datasetsReducer };
