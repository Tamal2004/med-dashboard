import createCachedSelector from 're-reselect';

// Local
import { mapArray } from 'libs';
import { selectDatasets } from './common';

// Counties
export const selectCounties = createCachedSelector(
    selectDatasets,
    ({ counties }) => mapArray(counties)
)(() => 'placeholder');

// Education Statuses
export const selectEducationStages = createCachedSelector(
    selectDatasets,
    ({ educationStages }) => mapArray(educationStages)
)(() => 'placeholder');

// Employee Counts
export const selectEmployeeCounts = createCachedSelector(
    selectDatasets,
    ({ employeeCounts }) => mapArray(employeeCounts)
)(() => 'placeholder');

// Employment Sectors
export const selectEmploymentSectors = createCachedSelector(
    selectDatasets,
    ({ employmentSectors }) => mapArray(employmentSectors)
)(() => 'placeholder');

// Employment Statuses
export const selectEmploymentStatuses = createCachedSelector(
    selectDatasets,
    ({ employmentStatuses }) => mapArray(employmentStatuses)
)(() => 'placeholder');

// Ethnicities
export const selectEthnicities = createCachedSelector(
    selectDatasets,
    ({ ethnicities }) => mapArray(ethnicities)
)(() => 'placeholder');

// Genders
export const selectGenders = createCachedSelector(
    selectDatasets,
    ({ genders }) => mapArray(genders)
)(() => 'placeholder');

// Marital Statuses
export const selectMaritalStatuses = createCachedSelector(
    selectDatasets,
    ({ maritalStatuses }) => mapArray(maritalStatuses)
)(() => 'placeholder');

// Nationalities
export const selectNationalities = createCachedSelector(
    selectDatasets,
    ({ nationalities }) => mapArray(nationalities)
)(() => 'placeholder');

// Titles
export const selectTitles = createCachedSelector(selectDatasets, ({ titles }) =>
    mapArray(titles)
)(() => 'placeholder');
