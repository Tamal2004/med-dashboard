import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import {
    normalizeClientSingle,
    normalizeClient,
    normalizeClients
} from 'normalizers';

// Graph QL
import {
    CreateClient,
    UpdateClient,
    RemoveClient,
    FetchClient,
    ListClients
} from 'graphql/clients';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    FETCH_CLIENT,
    LIST_CLIENTS,
    CREATE_CLIENT,
    UPDATE_CLIENT
} from 'actionTypes';
import { showNotification } from './notification';

const fetchClientAction = (async, payload = []) => ({
    type: FETCH_CLIENT,
    async,
    payload
});

export const fetchClient = id => async dispatch => {
    dispatch(fetchClientAction(REQUEST));
    const {
        data: { getClient, error = null }
    } = await API.graphql(graphqlOperation(FetchClient, { id }));

    if (!error) {
        dispatch(fetchClientAction(SUCCESS, normalizeClientSingle(getClient)));
    } else {
        dispatch(fetchClientAction(FAIL));
    }
};

const listClientsAction = (async, payload = []) => ({
    type: LIST_CLIENTS,
    async,
    payload
});

export const listClients = () => async dispatch => {
    dispatch(listClientsAction(REQUEST));
    const {
        data: { listClients: { items: listClients = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListClients));

    if (!error) {
        dispatch(listClientsAction(SUCCESS, normalizeClients(listClients)));
    } else {
        dispatch(listClientsAction(FAIL));
    }
};

const createClientAction = (async, payload = []) => ({
    type: CREATE_CLIENT,
    async,
    payload
});

export const createClient = input => async dispatch => {
    dispatch(createClientAction(REQUEST));
    const {
        data: { createClient, error = null }
    } = await API.graphql(graphqlOperation(CreateClient, { input }));

    if (!error) {
        dispatch(createClientAction(SUCCESS, normalizeClient(createClient)));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Created successfully!'
            })
        );
    } else {
        dispatch(createClientAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Something went wrong!'
            })
        );
    }
};

const updateClientAction = (async, payload = []) => ({
    type: UPDATE_CLIENT,
    async,
    payload
});

export const updateClient = input => async dispatch => {
    dispatch(updateClientAction(REQUEST));
    const {
        data: { updateClient, error = null }
    } = await API.graphql(graphqlOperation(UpdateClient, { input }));

    if (!error) {
        dispatch(updateClientAction(SUCCESS, normalizeClient(updateClient)));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Updated successfully!'
            })
        );
    } else {
        dispatch(updateClientAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Update failed'
            })
        );
    }
};
