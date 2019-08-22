import createCachedSelector from 're-reselect';

// Local
import { mapArray } from 'libs';
import { selectDatasets } from './common';

import React from 'react';
import { Link } from 'components';

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

// todo: TEMP

const generateProjects = (
    tester,
    number,
    project,
    date = '07/04/2018',
    contactDate = '02/06/2019'
) => ({
    'Tester Name': {
        Component: <Link to={`/tester/${tester}`}>{tester}</Link>,
        value: tester,
        editable: true
    },
    'Tester Number': { Component: number, editable: true },
    'Last Project': {
        Component: <Link to={`/project/${project}`}>{project}</Link>,
        value: project
    },
    'Last Testing Date': date,
    'Last Contact Date': contactDate,
    actions: {}
});

export const selectTesters = createCachedSelector(
    selectDatasets,
    ({ titles }) =>
        Array.range(0, 3)
            .map(() => [
                generateProjects('Jill Test', 5234, 'GM33', '03/09/2018'),
                generateProjects(
                    'Adolf Test',
                    4001,
                    '03/09/2018',
                    '08/12/2018'
                ),
                generateProjects('ADER Test', 4001, '03/09/2018', '08/12/2018')
            ])
            .flatMap(x => x)
)(() => 'placeholder');

export const selectTester = createCachedSelector(
    selectTesters,
    (state, index) => index,
    (state, index) => {
        const newObj = {};
        const rowData = state[index];
        const isEditable = value =>
            Object.prototype.hasOwnProperty.call(value, 'editable');
        if (rowData && typeof rowData === 'object') {
            Object.keys(rowData).forEach(key => {
                if (isEditable(rowData[key]))
                    newObj[key] = rowData[key].value || rowData[key].Component;
            });
        }

        return newObj;
    }
)(() => 'placeholder');
