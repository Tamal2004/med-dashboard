// Local
import initialState from './initialState';

// Action Types

const projectsReducer = (
    state = initialState,
    { type, payload, async, ...action }
) => {
    switch (type) {
        default: {
            return state;
        }
    }
};

export { projectsReducer as default, projectsReducer };
