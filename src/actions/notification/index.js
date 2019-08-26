import { SET_NOTITICATION, RESET_NOTITICATION } from 'actionTypes';

export const showNotification = payload => {
    return dispatch => {
        dispatch({ type: SET_NOTITICATION, payload });
    };
};

export const resetNotification = () => {
    return dispatch => {
        dispatch({ type: RESET_NOTITICATION });
    };
};
