import API, { graphqlOperation } from '@aws-amplify/api';

// Libs
import { history } from 'libs';

// Normalizers
import {
    normalizeClientSingle,
    normalizeClient,
    normalizeClients,
    normalizeProjectsLists
} from 'normalizers';

// Graph QL
import {
    CreateClient,
    UpdateClient,
    FetchClient,
    RemoveClient,
    FetchClientProjects,
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
    UPDATE_CLIENT,
    REMOVE_CLIENT
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

export const listClients = (search = null) => async dispatch => {
    // Compose filters
    const filter = search
        ? {
              filter: {
                  or: [{ name: { contains: search } }]
              }
          }
        : {};

    dispatch(listClientsAction(REQUEST));
    const {
        data: {
            listSortedClients: { items: listSortedClients = [] } = {},
            error = null
        }
    } = await API.graphql(graphqlOperation(ListClients, filter));

    if (!error) {
        dispatch(
            listClientsAction(SUCCESS, normalizeClients(listSortedClients))
        );
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

const removeClientAction = (async, payload = []) => ({
    type: REMOVE_CLIENT,
    async
});

export const removeClient = id => async dispatch => {
    dispatch(removeClientAction(REQUEST));

    try {
        const {
            data: {
                getClient: {
                    projects: { items: projects = [] }
                }
            }
        } = await API.graphql(graphqlOperation(FetchClientProjects, { id }));

        const {
            sessionIds,
            contactNoteIds,
            projectIds
        } = normalizeProjectsLists(projects);

        await API.graphql(
            graphqlOperation(
                RemoveClient(
                    !!sessionIds.length,
                    !!contactNoteIds.length,
                    !!projectIds.length
                ),
                {
                    ...(sessionIds.length ? { sessionIds } : {}),
                    ...(contactNoteIds.length ? { contactNoteIds } : {}),
                    ...(projectIds.length ? { projectIds } : {}),
                    input: { id }
                }
            )
        );

        dispatch(removeClientAction(SUCCESS));
        history.push('/client');
        dispatch(
            showNotification({
                type: 'success',
                message: 'Successfully deleted client!'
            })
        );
    } catch {
        dispatch(removeClientAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Delete failed'
            })
        );
    }

    // normalizeProjectsLists
    // const {
    //     data: { updateClient, error = null }
    // } = await API.graphql(graphqlOperation(UpdateClient, { input }));
    //
    // if (!error) {
    //     dispatch(removeClientAction(SUCCESS));
    //     dispatch(
    //         showNotification({
    //             type: 'success',
    //             message: 'Successfully deleted client!'
    //         })
    //     );
    // } else {
    //     dispatch(removeClientAction(FAIL));
    //     dispatch(
    //         showNotification({
    //             type: 'error',
    //             message: 'Delete failed'
    //         })
    //     );
    // }
};
