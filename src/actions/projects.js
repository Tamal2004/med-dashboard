import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';

// Libs
import { history } from 'libs';

// Graph QL
import { createProject as gQLCreateProject } from 'graphql/mutations';
import {
    FetchProject,
    UpdateProject,
    ListProjects,
    ListProjectClients,
    ListProjectUsers,
    ListProjectReport
} from 'graphql/project';

// Normalizers
import {
    normalizeProjects,
    normalizeProject,
    normalizeUpdatedProject,
    normalizeProjectUsers,
    normalizeProjectReport
} from 'normalizers';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_PROJECT,
    FETCH_PROJECT,
    UPDATE_PROJECT,
    LIST_PROJECTS,
    LIST_PROJECT_CLIENTS,
    LIST_PROJECT_USERS,
    FETCH_PROJECT_REPORT,
    RESET_PROJECT_REPORT
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

const fetchProjectAction = (async, payload) => ({
    type: FETCH_PROJECT,
    async,
    payload
});

export const fetchProject = id => async dispatch => {
    dispatch(fetchProjectAction(REQUEST));
    const {
        data: { getProject, error = null }
    } = await API.graphql(graphqlOperation(FetchProject, { id }));

    if (!error) {
        const {
            projectDetails,
            projectManagement,
            clientFeedback,
            projectData
        } = normalizeProject(getProject);

        dispatch(initialize('ProjectDetails', projectDetails));
        dispatch(initialize('ProjectManagement', projectManagement));
        dispatch(initialize('ClientFeedback', clientFeedback));
        dispatch(fetchProjectAction(SUCCESS, projectData));
    } else {
        dispatch(fetchProjectAction(FAIL));
    }
};

const updateProjectAction = (async, payload) => ({
    type: UPDATE_PROJECT,
    async,
    payload
});

export const updateProject = project => async dispatch => {
    dispatch(updateProjectAction(REQUEST));
    const {
        data: { updateProject, error = null }
    } = await API.graphql(graphqlOperation(UpdateProject, { input: project }));

    if (!error) {
        const {
            projectDetails,
            projectManagement,
            clientFeedback,
            projectData
        } = normalizeUpdatedProject(updateProject);

        dispatch(initialize('ProjectDetails', projectDetails));
        dispatch(initialize('ProjectManagement', projectManagement));
        dispatch(initialize('ClientFeedback', clientFeedback));
        dispatch(updateProjectAction(SUCCESS, projectData));
    } else {
        dispatch(updateProjectAction(FAIL));
    }
};

const listProjectsAction = (async, payload = []) => ({
    type: LIST_PROJECTS,
    async,
    payload
});

export const listProjects = (
    statuses = [],
    search = null
) => async dispatch => {
    const searchFilter = search
        ? [
              {
                  or: [
                      { reference: { contains: search } },
                      { title: { contains: search } }
                  ]
              }
          ]
        : [];

    const statusFilter = statuses.length
        ? [
              {
                  or: [
                      ...statuses.map(statusFilter => ({
                          status: { contains: statusFilter }
                      }))
                  ]
              }
          ]
        : [];

    // Compose filters
    const filter = {
        and: [...statusFilter, ...searchFilter]
    };

    const variables = statuses.length || search ? { filter } : {};

    dispatch(listProjectsAction(REQUEST));
    const {
        data: { listProjects, error = null }
    } = await API.graphql(graphqlOperation(ListProjects, variables));

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

const listProjectUsersAction = (async, payload = []) => ({
    type: LIST_PROJECT_USERS,
    async,
    payload
});

export const listProjectUsers = () => async dispatch => {
    dispatch(listProjectUsersAction(REQUEST));
    const {
        data: { listUsers: { items = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListProjectUsers));

    if (!error) {
        dispatch(listProjectUsersAction(SUCCESS, normalizeProjectUsers(items)));
    } else {
        dispatch(listProjectUsersAction(FAIL));
    }
};

const fetchProjectReportsAction = (async, payload = []) => ({
    type: FETCH_PROJECT_REPORT,
    async,
    payload
});

export const fetchProjectReport = (
    id,
    testerIndices = []
) => async dispatch => {
    dispatch(fetchProjectReportsAction(REQUEST));
    const {
        data: { getProject = {}, error = null }
    } = await API.graphql(graphqlOperation(ListProjectReport, { id }));

    if (!error) {
        dispatch(
            fetchProjectReportsAction(
                SUCCESS,
                normalizeProjectReport(getProject, testerIndices)
            )
        );
    } else {
        dispatch(fetchProjectReportsAction(FAIL));
    }
};

export const resetProjectReport = () => ({
    type: RESET_PROJECT_REPORT
});
