// Local
import initialState from './initialState';

// Action Types

const authReducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        default: {
            return state;
        }
    }
};

export { authReducer as default, authReducer };
