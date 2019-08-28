import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

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
    console.log('fetchPublicClients');
    window.LOG_LEVEL = 'DEBUG';

    dispatch(fetchClientsAction(REQUEST));
    console.log('fetchClientsAction');

    const res = await Auth.currentCredentials().then(data => {
        console.log('currentCredentials', data);
        return API.graphql({
            authMode: 'AWS_IAM',
            query: gQLListClients,
            credentials: data
        }).then(data => console.log('API DATA', data));
    });
    // const res =

    console.log('listClients', res);

    // if (!error) {
    //     dispatch(fetchClientsAction(SUCCESS, listClients));
    // } else {
    //     dispatch(fetchClientsAction(FAIL));
    // }
};
