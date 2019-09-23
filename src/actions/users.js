import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import { normalizeUsers } from 'normalizers';

// Graph QL
import {
    CreateUser,
    DeleteUser,
    UpdateUser,
    ListUsers,
    FetchUserByEmail
} from 'graphql/users';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_USER,
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
    dispatch(listUsersAction(REQUEST));
    const {
        data: { listUsers: { items: listUsers = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListUsers));

    if (!error) {
        dispatch(listUsersAction(SUCCESS, normalizeUsers(listUsers)));
    } else {
        dispatch(listUsersAction(FAIL));
    }
};

const createUserAction = (async, payload = []) => ({
    type: CREATE_USER,
    async,
    payload
});

export const createUser = input => async dispatch => {
    dispatch(createUserAction(REQUEST));
    const {
        data: { createUser = {}, error = null }
    } = await API.graphql(graphqlOperation(CreateUser, { input }));

    if (!error) {
        dispatch(createUserAction(SUCCESS, createUser));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Created successfully!'
            })
        );
    } else {
        dispatch(createUserAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Something went wrong!'
            })
        );
    }
};

const deleteUserAction = (async, payload = []) => ({
    type: REMOVE_USER,
    async,
    payload
});

export const deleteUser = input => async dispatch => {
    dispatch(deleteUserAction(REQUEST));
    const {
        data: { deleteUser = {}, error = null }
    } = await API.graphql(graphqlOperation(DeleteUser, { input }));

    if (!error) {
        dispatch(deleteUserAction(SUCCESS, deleteUser));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Deleted successfully!'
            })
        );
    } else {
        dispatch(deleteUserAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Something went wrong!'
            })
        );
    }
};
