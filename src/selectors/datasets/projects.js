import createCachedSelector from 're-reselect';

// Local
import { mapArray } from 'libs';
import { selectDatasets } from './common';

// Project Statuses
export const selectProjectStatuses = createCachedSelector(
    selectDatasets,
    ({ projectStatuses }) => mapArray(projectStatuses)
)(() => 'placeholder');
