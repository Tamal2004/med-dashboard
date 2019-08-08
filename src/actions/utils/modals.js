import { SET_MODAL, OPEN_MODAL, CLOSE_MODAL } from 'actionTypes';

export const setModal = handlerName => ({
    type: SET_MODAL,
    payload: { handlerName }
});

export const openModal = handlerName => ({
    type: OPEN_MODAL,
    payload: { handlerName }
});

export const closeModal = handlerName => ({
    type: CLOSE_MODAL,
    payload: { handlerName }
});
