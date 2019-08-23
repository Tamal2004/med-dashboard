import createCachedSelector from 're-reselect';

// Local
import { mapArray, mapToSelect, generateProjectList } from 'libs';

const selectProjects = state => state.projects;

// Project Clients
export const selectProjectClients = createCachedSelector(
    selectProjects,
    ({ clients }) => mapToSelect(clients, 'id', 'name')
)(() => 'placeholder');

// Project List
export const selectProjectList = createCachedSelector(
    selectProjects,
    ({ list }) => generateProjectList(list)
)(() => 'placeholder');
