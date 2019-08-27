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

// Project Individual
export const selecProjectId = createCachedSelector(
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
