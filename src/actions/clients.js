import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import { normalizeClient, normalizeClients } from 'normalizers';

// Graph QL
import {
    CreateClient,
    UpdateClient,
    RemoveClient,
    ListClients
} from 'graphql/clients';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    LIST_CLIENTS,
    CREATE_CLIENT,
    UPDATE_CLIENT
} from 'actionTypes';

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
    } else {
        dispatch(createClientAction(FAIL));
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
    } else {
        dispatch(updateClientAction(FAIL));
    }
};
