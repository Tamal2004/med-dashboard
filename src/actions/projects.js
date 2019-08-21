import API, { graphqlOperation } from '@aws-amplify/api';

// Local
import { history } from 'libs';

// Graph QL
import { listProjects as gQLListProjects } from 'graphql/queries';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    FETCH_PROJECTS,
    FETCH_PROJECT_CLIENTS
} from 'store/actionTypes';

const fetchProjectsAction = (async, payload = []) => ({
    type: FETCH_PROJECTS,
    async,
    payload
});

export const fetchProjects = () => async dispatch => {
    dispatch(fetchProjectsAction(REQUEST));
    const {
        data: { listProjects, error = null }
    } = await API.graphql(graphqlOperation(gQLListProjects));

    console.log(listProjects);

    if (!error) {
        dispatch(fetchProjectsAction(SUCCESS, listProjects));
    } else {
        dispatch(fetchProjectsAction(FAIL));
    }
};

const fetchProjectClientsAction = (async, payload = []) => ({
    type: FETCH_PROJECT_CLIENTS,
    async,
    payload
});

export const fetchProjectClients = () => async dispatch => {
    dispatch(fetchProjectClientsAction(REQUEST));
    const {
        data: { listProjects, error = null }
        // data: { listProjectClients, error = null }
    } = await API.graphql(graphqlOperation(gQLListProjects));

    console.log(listProjects);
    // console.log(listProjectClients);

    if (!error) {
        // dispatch(fetchProjectClientsAction(SUCCESS, listProjectClients));
        dispatch(fetchProjectClientsAction(SUCCESS, listProjects));
    } else {
        dispatch(fetchProjectClientsAction(FAIL));
    }
};
