import API, { graphqlOperation } from '@aws-amplify/api';

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

    if (!error) {
        dispatch(fetchClientsAction(SUCCESS, listClients));
    } else {
        dispatch(fetchClientsAction(FAIL));
    }
};
