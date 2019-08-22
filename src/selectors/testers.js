import createCachedSelector from 're-reselect';

// Local
import { mapArray } from 'libs';
import { selectDatasets } from './common';
import React from 'react';
import { Link } from 'components';

const selectTesters = state => state.testers;

// Contact Types
export const selectContactTypes = createCachedSelector(
    selectDatasets,
    ({ contactTypes }) => mapArray(contactTypes)
)(() => 'placeholder');

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

// Facilities
export const selectFacilities = createCachedSelector(
    selectDatasets,
    ({ facilities }) => mapArray(facilities)
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

// Tester Home
export const selectTestersHome = createCachedSelector(
    selectTesters,
    ({ home = [{}] }) => {
        const sss = home.map(
            ({
                testerName,
                testerNumber,
                lastProject,
                lastTestingDate,
                lastContactDate
            }) => ({
                'Tester Name': {
                    Component: (
                        <Link to={`/tester/${testerNumber}`}>{testerName}</Link>
                    ),
                    value: testerName
                },
                'Tester Number': testerNumber,
                'Last Project': {
                    Component: (
                        <Link to={`/project/${lastProject}`}>
                            {lastProject}
                        </Link>
                    ),
                    value: lastProject
                },
                'Last Testing Date': lastTestingDate,
                'Last Contact Date': lastContactDate
            })
        );

        console.log(sss);

        console.log(home.length > 0);
        return home.length > 0 ? home : [{}];
    }
)(() => 'placeholder');
