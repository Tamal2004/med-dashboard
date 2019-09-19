import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';
import uuid from 'uuid/v4';

// Libs
import { history } from 'libs';

// Graph QL
import { createProject as gQLCreateProject } from 'graphql/mutations';
import {
    FetchProject,
    FetchProjectLists,
    UpdateProject,
    RemoveProject,
    ListProjects,
    SearchProjects,
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
    normalizeProjectReport,
    normalizeProjectsLists
} from 'normalizers';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_PROJECT,
    FETCH_PROJECT,
    UPDATE_PROJECT,
    REMOVE_PROJECT,
    LIST_PROJECTS,
    LIST_PROJECTS_SEARCH,
    LIST_PROJECT_CLIENTS,
    LIST_PROJECT_USERS,
    FETCH_PROJECT_REPORT,
    RESET_PROJECT_REPORT
} from 'actionTypes';
import { showNotification } from './notification';

// Selectors
import { selectIsValidProjectQuery } from 'selectors';

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
        dispatch(
            showNotification({
                type: 'success',
                message: 'Project created successfully!'
            })
        );
        history.push('/project');
    } else {
        dispatch(createProjectAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
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
        dispatch(
            showNotification({
                type: 'success',
                message: 'Project updated successfully!'
            })
        );
    } else {
        dispatch(updateProjectAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

const listProjectsSearchAction = (
    async,
    payload = [],
    queryId = null,
    isFinal = false
) => ({
    type: LIST_PROJECTS_SEARCH,
    async,
    payload,
    meta: { queryId, isFinal }
});

export const listProjectsSearch = (statuses = [], search = null) => async (
    dispatch,
    getState
) => {
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

    const queryId = uuid();

    dispatch(listProjectsSearchAction(REQUEST, [], queryId));

    const runQuery = async (pageToken = null, firstTime = true) => {
        if (
            selectIsValidProjectQuery(getState(), queryId) &&
            (firstTime || pageToken)
        ) {
            const variables = {
                filter,
                ...(pageToken ? { nextToken: pageToken } : {})
            };
            const {
                data: {
                    listSortedProjects: {
                        items: listSortedProjects = [],
                        nextToken
                    } = {},
                    error = null
                }
            } = await API.graphql(graphqlOperation(SearchProjects, variables));

            if (!error) {
                dispatch(
                    listProjectsSearchAction(
                        SUCCESS,
                        normalizeProjects(listSortedProjects),
                        queryId,
                        !nextToken
                    )
                );
            } else {
                dispatch(listProjectsSearchAction(FAIL));
            }
            return runQuery(nextToken, false);
        }
    };

    return runQuery();
};

const listProjectsAction = (async, payload = []) => ({
    type: LIST_PROJECTS,
    async,
    payload
});

export const listProjects = () => async dispatch => {
    dispatch(listProjectsAction(REQUEST));
    const {
        data: {
            listSortedProjects: { items: listSortedProjects = [] },
            error = null
        }
    } = await API.graphql(graphqlOperation(ListProjects));

    if (!error) {
        dispatch(
            listProjectsAction(SUCCESS, normalizeProjects(listSortedProjects))
        );
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
        data: {
            listSortedClients: { items: listSortedClients = [] } = {},
            error = null
        }
    } = await API.graphql(graphqlOperation(ListProjectClients));

    if (!error) {
        dispatch(listProjectClientsAction(SUCCESS, listSortedClients));
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
        data: {
            listSortedUsers: { items: listSortedUsers = [] } = {},
            error = null
        }
    } = await API.graphql(graphqlOperation(ListProjectUsers));

    if (!error) {
        dispatch(
            listProjectUsersAction(
                SUCCESS,
                normalizeProjectUsers(listSortedUsers)
            )
        );
    } else {
        dispatch(listProjectUsersAction(FAIL));
    }
};

const fetchProjectReportAction = (async, payload = []) => ({
    type: FETCH_PROJECT_REPORT,
    async,
    payload
});

export const fetchProjectReport = (
    id,
    testerIndices = []
) => async dispatch => {
    dispatch(fetchProjectReportAction(REQUEST));
    const {
        data: { getProject = {}, error = null }
    } = await API.graphql(graphqlOperation(ListProjectReport, { id }));

    if (!error) {
        dispatch(
            fetchProjectReportAction(
                SUCCESS,
                normalizeProjectReport(getProject, testerIndices)
            )
        );
    } else {
        dispatch(fetchProjectReportAction(FAIL));
    }
};

export const resetProjectReport = () => ({
    type: RESET_PROJECT_REPORT
});

const removeProjectAction = (async, payload = []) => ({
    type: REMOVE_PROJECT,
    async
});

export const removeProject = id => async dispatch => {
    dispatch(removeProjectAction(REQUEST));

    try {
        const {
            data: { getProject }
        } = await API.graphql(graphqlOperation(FetchProjectLists, { id }));

        const { sessionIds, contactNoteIds } = normalizeProjectsLists([
            getProject
        ]);

        await API.graphql(
            graphqlOperation(
                RemoveProject(!!sessionIds.length, !!contactNoteIds.length),
                {
                    ...(sessionIds.length ? { sessionIds } : {}),
                    ...(contactNoteIds.length ? { contactNoteIds } : {}),
                    input: { id }
                }
            )
        );

        dispatch(removeProjectAction(SUCCESS));
        history.push('/project');
        dispatch(
            showNotification({
                type: 'success',
                message: 'Successfully deleted project!'
            })
        );
    } catch {
        dispatch(removeProjectAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Delete failed'
            })
        );
    }
};
