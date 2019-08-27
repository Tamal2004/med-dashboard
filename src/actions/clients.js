import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import AWS from 'aws-sdk';

// Local
import { history } from 'libs';

// Graph QL
import { listClients as gQLListClients } from 'graphql/queries';

// Action Types
import { REQUEST, SUCCESS, FAIL, FETCH_CLIENTS } from 'actionTypes';

const fetchClientsAction = (async, payload = []) => ({
    type: FETCH_CLIENTS,
    async,
    payload
});

export const fetchClients = () => async dispatch => {
    dispatch(fetchClientsAction(REQUEST));
    const {
        data: { listClients, error = null }
    } = await API.graphql(graphqlOperation(gQLListClients));

    console.log(listClients);

    if (!error) {
        dispatch(fetchClientsAction(SUCCESS, listClients));
    } else {
        dispatch(fetchClientsAction(FAIL));
    }
};

export const fetchPublicClients = () => async dispatch => {
    console.log('fetchPublicClients', AWS);
    window.LOG_LEVEL = 'DEBUG';
    dispatch(fetchClientsAction(REQUEST));
    const res = await API.graphql({
        query: gQLListClients,
        auth: {
            credentials: Auth.currentCredentials()
        }
    });

    console.log('listClients', res);

    // if (!error) {
    //     dispatch(fetchClientsAction(SUCCESS, listClients));
    // } else {
    //     dispatch(fetchClientsAction(FAIL));
    // }
};
