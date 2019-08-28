import API, { graphqlOperation } from '@aws-amplify/api';
// Local
import { history } from 'libs';

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
    LIST_SESSION_PROJECTS
} from 'actionTypes';

const listSessionProjectsAction = (async, payload = []) => ({
    type: LIST_SESSION_PROJECTS,
    async,
    payload
});

export const listSessionProjects = () => async dispatch => {
    dispatch(listSessionProjectsAction(REQUEST));
    const {
        data: { listProjects: { items = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListIncompleteProjects));

    if (!error) {
        dispatch(listSessionProjectsAction(SUCCESS, items));
    } else {
        dispatch(listSessionProjectsAction(FAIL));
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
    } else {
        dispatch(createSessionAction(FAIL));
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
    } else {
        dispatch(updateSessionAction(FAIL));
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
    } else {
        dispatch(removeSessionAction(FAIL));
    }
};
