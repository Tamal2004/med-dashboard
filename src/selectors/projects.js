import createCachedSelector from 're-reselect';

// Local
import {
    mapArray,
    mapToSelect,
    generateProjectList,
    generateProjectSessions,
    generateProjectProfiles
} from 'libs';

const selectProjects = state => state.projects;

const selectIndividual = createCachedSelector(
    selectProjects,
    ({ individual }) => individual
)(() => 'placeholder');

// Project Clients
export const selectProjectClients = createCachedSelector(
    selectProjects,
    ({ clients }) => mapToSelect(clients, 'id', 'name')
)(() => 'placeholder');

// Project Users
export const selectProjectUsers = createCachedSelector(
    selectProjects,
    ({ users }) => mapArray(users)
)(() => 'placeholder');

// Project Individual
export const selectProjectId = createCachedSelector(
    selectIndividual,
    ({ id }) => id
)(() => 'placeholder');

export const selectProjectProfiles = createCachedSelector(
    selectIndividual,
    ({ profiles = [] }) => generateProjectProfiles(profiles)
)(() => 'placeholder');

export const selectProjectSessions = createCachedSelector(
    selectIndividual,
    ({ sessions = [] }) => generateProjectSessions(sessions)
)(() => 'placeholder');

// Project List
export const selectProjectList = createCachedSelector(
    selectProjects,
    ({ list }) => generateProjectList(list)
)(() => 'placeholder');

// Project Search
export const selectIsValidProjectQuery = createCachedSelector(
    selectProjects,
    (state, id) => id,
    ({ queryId }, id) => queryId === id
)(() => 'placeholder');

export const selectAreProjectsSearching = createCachedSelector(
    selectProjects,
    ({ isSearching }) => isSearching
)(() => 'placeholder');

// Project Report
export const selectProjectReport = createCachedSelector(
    selectProjects,
    ({ report }) => report
)(() => 'placeholder');
