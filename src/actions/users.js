import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import { normalizeUsers } from 'normalizers';

// Graph QL
import {
    CreateClient,
    UpdateClient,
    RemoveClient,
    FetchClient,
    ListUsers
} from 'graphql/users';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_USER,
    UPDATE_USER,
    REMOVE_USER,
    LIST_USERS
} from 'actionTypes';
import { showNotification } from './notification';

const listUsersAction = (async, payload = []) => ({
    type: LIST_USERS,
    async,
    payload
});

export const listUsers = () => async dispatch => {
    console.log('calling listUsers');
    dispatch(listUsersAction(REQUEST));
    const {
        data: { listUsers: { items: listUsers = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListUsers));
    console.log('listUsers', listUsers);
    if (!error) {
        dispatch(listUsersAction(SUCCESS, normalizeUsers(listUsers)));
    } else {
        dispatch(listUsersAction(FAIL));
    }
};
