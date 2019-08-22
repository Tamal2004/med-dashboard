import createCachedSelector from 're-reselect';

// Local
import { mapArray, mapToSelect } from 'libs';
import { selectDatasets } from './common';

const selectProjectsReducer = state => state.projects;

// Project Statuses
export const selectProjectStatuses = createCachedSelector(
    selectDatasets,
    ({ projectStatuses }) => mapArray(projectStatuses)
)(() => 'placeholder');

// Project Clients
export const selectProjectClients = createCachedSelector(
    selectProjectsReducer,
    ({ clients = [] }) => mapToSelect(clients, 'id', 'name')
)(() => 'placeholder');
