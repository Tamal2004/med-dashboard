import { SET_MODAL, CLOSE_MODAL, OPEN_MODAL } from 'actionTypes';

// Local
import initialState from './initialState';

const utilsReducer = (state = initialState, { type, payload, ...action }) => {
    switch (type) {
        case OPEN_MODAL: {
            const { handlerName } = payload;
            return {
                ...state,
                modals: {
                    ...state.modal,
                    [handlerName]: true
                }
            };
        }

        case SET_MODAL:
        case CLOSE_MODAL:
            const { handlerName } = payload;
            return {
                ...state,
                modals: {
                    ...state.modal,
                    [handlerName]: false
                }
            };

        default: {
            return state;
        }
    }
};

export { utilsReducer as default, utilsReducer };
