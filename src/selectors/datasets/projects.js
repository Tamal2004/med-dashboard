import createCachedSelector from 're-reselect';

// Local
import { mapArray } from 'libs';
import { selectDatasets } from './common';

// Project Statuses
export const selectProjectStatuses = createCachedSelector(
    selectDatasets,
    ({ projectStatuses }) => mapArray(projectStatuses)
)(() => 'placeholder');

// New Project Statuses
export const selectNewProjectStatuses = createCachedSelector(
    selectProjectStatuses,
    projectStatuses => projectStatuses.slice(0, -1)
)(() => 'placeholder');

// Facilities
export const selectFacilities = createCachedSelector(
    selectDatasets,
    ({ facilities }) => facilities
)(() => 'placeholder');
