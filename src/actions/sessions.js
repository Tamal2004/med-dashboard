import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import { normalizeSessionTester } from 'normalizers';

// Graph QL
import { CreateSession, UpdateSession, RemoveSession } from 'graphql/session';
import { ListIncompleteProjects } from 'graphql/project';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_SESSION,
    UPDATE_SESSION,
    REMOVE_SESSION,
    LIST_INCOMPLETE_PROJECTS
} from 'actionTypes';
import { showNotification } from './notification';

const listIncompleteProjectsAction = (async, payload = []) => ({
    type: LIST_INCOMPLETE_PROJECTS,
    async,
    payload
});

export const listIncompleteProjects = () => async dispatch => {
    dispatch(listIncompleteProjectsAction(REQUEST));
    const {
        data: {
            listSortedProjects: { items: listSortedProjects = [] } = {},
            error = null
        }
    } = await API.graphql(graphqlOperation(ListIncompleteProjects));

    if (!error) {
        dispatch(listIncompleteProjectsAction(SUCCESS, listSortedProjects));
    } else {
        dispatch(listIncompleteProjectsAction(FAIL));
    }
};

const createSessionAction = (async, payload = []) => ({
    type: CREATE_SESSION,
    async,
    payload
});

export const createSession = input => async dispatch => {
    dispatch(createSessionAction(REQUEST));
    const {
        data: { createSession, error = null }
    } = await API.graphql(graphqlOperation(CreateSession, { input }));

    if (!error) {
        dispatch(
            createSessionAction(SUCCESS, normalizeSessionTester(createSession))
        );
        dispatch(
            showNotification({
                type: 'success',
                message: 'Session created successfully!'
            })
        );
    } else {
        dispatch(createSessionAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

const updateSessionAction = (async, payload = []) => ({
    type: UPDATE_SESSION,
    async,
    payload
});

export const updateSession = input => async dispatch => {
    dispatch(updateSessionAction(REQUEST));
    const {
        data: { updateSession, error = null }
    } = await API.graphql(graphqlOperation(UpdateSession, { input }));

    if (!error) {
        dispatch(
            updateSessionAction(SUCCESS, normalizeSessionTester(updateSession))
        );
        dispatch(
            showNotification({
                type: 'success',
                message: 'Session updated successfully!'
            })
        );
    } else {
        dispatch(updateSessionAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

const removeSessionAction = (async, payload = []) => ({
    type: REMOVE_SESSION,
    async,
    payload
});

export const removeSession = id => async dispatch => {
    dispatch(removeSessionAction(REQUEST));
    const {
        data: { deleteSession: { id: sessionId } = {}, error = null }
    } = await API.graphql(graphqlOperation(RemoveSession, { input: { id } }));

    if (!error) {
        dispatch(removeSessionAction(SUCCESS, sessionId));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Session removed successfully!'
            })
        );
    } else {
        dispatch(removeSessionAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Remove failed!'
            })
        );
    }
};
