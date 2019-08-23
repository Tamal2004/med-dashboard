import API, { graphqlOperation } from '@aws-amplify/api';

// Local
import { history } from 'libs';

// Graph QL

import { listProjects as gQLListProjects } from 'graphql/queries';
import { createProject as gQLCreateProject } from 'graphql/mutations';
import { listProjectClients } from 'graphql/project';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_PROJECT,
    FETCH_PROJECTS,
    FETCH_PROJECT_CLIENTS
} from 'actionTypes';

const createProjectAction = async => ({
    type: CREATE_PROJECT,
    async
});

export const createProject = project => async dispatch => {
    dispatch(createProjectAction(REQUEST));
    const res = await API.graphql(
        graphqlOperation(gQLCreateProject, { input: project })
    );

    console.log(res);

    if (!res.error) {
        dispatch(createProjectAction(SUCCESS));
        history.push('/project');
    } else {
        dispatch(createProjectAction(FAIL));
    }
};

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
        data: { listClients: { items = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(listProjectClients));

    if (!error) {
        dispatch(fetchProjectClientsAction(SUCCESS, items));
    } else {
        dispatch(fetchProjectClientsAction(FAIL));
    }
};
