import API, { graphqlOperation } from '@aws-amplify/api';

// Libs
import { history } from 'libs';

// Graph QL
import { createProject as gQLCreateProject } from 'graphql/mutations';
import { ListProjects, ListProjectClients } from 'graphql/project';

// Normalizers
import { normalizeProjects } from 'normalizers';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_PROJECT,
    LIST_PROJECTS,
    LIST_PROJECT_CLIENTS
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

    if (!res.error) {
        dispatch(createProjectAction(SUCCESS));
        history.push('/project');
    } else {
        dispatch(createProjectAction(FAIL));
    }
};

const listProjectsAction = (async, payload = []) => ({
    type: LIST_PROJECTS,
    async,
    payload
});

export const listProjects = () => async dispatch => {
    dispatch(listProjectsAction(REQUEST));
    const {
        data: { listProjects, error = null }
    } = await API.graphql(graphqlOperation(ListProjects));

    if (!error) {
        dispatch(listProjectsAction(SUCCESS, normalizeProjects(listProjects)));
    } else {
        dispatch(listProjectsAction(FAIL));
    }
};

const listProjectClientsAction = (async, payload = []) => ({
    type: LIST_PROJECT_CLIENTS,
    async,
    payload
});

export const listProjectClients = () => async dispatch => {
    dispatch(listProjectClientsAction(REQUEST));
    const {
        data: { listClients: { items = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListProjectClients));

    if (!error) {
        dispatch(listProjectClientsAction(SUCCESS, items));
    } else {
        dispatch(listProjectClientsAction(FAIL));
    }
};
