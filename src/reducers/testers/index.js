// Local
import initialState from './initialState';

// Action Types

const testersReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    switch (type) {
        default: {
            return state;
        }
    }
};

export { testersReducer as default, testersReducer };
