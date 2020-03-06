import createCachedSelector from 're-reselect';

// Local
import { selectContactTypes } from './datasets';
import {
    mapToSelect,
    generateTesterList,
    generateTestersSearch,
    generateTesterSessions,
    generateTesterContactNotes
} from 'libs';

const selectTesters = state => state.testers;

export const selectIndividual = createCachedSelector(
    selectTesters,
    ({ individual }) => individual
)(() => 'placeholder');

// Incomplete Projects
export const selectIncompleteProjects = createCachedSelector(
    selectIndividual,
    ({ projects = [] }) => mapToSelect(projects, 'id', 'reference')
)(() => 'placeholder');

// Tester Individual
export const selectTesterId = createCachedSelector(
    selectIndividual,
    ({ id }) => id
)(() => 'placeholder');

export const selectTesterSessionIds = createCachedSelector(
    selectIndividual,
    ({ sessions }) => sessions.map(({ id }) => id)
)(() => 'placeholder');

export const selectTesterContactNoteIds = createCachedSelector(
    selectIndividual,
    ({ contactNotes }) => contactNotes.map(({ id }) => id)
)(() => 'placeholder');

export const selectTesterSessions = createCachedSelector(
    selectIndividual,
    ({ sessions }) => generateTesterSessions(sessions)
)(() => 'placeholder');

export const selectTesterContactNotes = createCachedSelector(
    selectIndividual,
    selectContactTypes,
    ({ contactNotes }, contactTypes) =>
        generateTesterContactNotes(contactNotes, contactTypes)
)(() => 'placeholder');

// Tester List
export const selectTesterList = createCachedSelector(
    selectTesters,
    ({ list }) => generateTesterList(list)
)(() => 'placeholder');

// Tester Search
export const selectTestersSearch = createCachedSelector(
    selectTesters,
    ({ search }) => search
)(() => 'placeholder');

export const selectResults = createCachedSelector(
    selectTestersSearch,
    ({ results }) => results
)(() => 'placeholder');

export const selectTesterResults = createCachedSelector(
    selectResults,
    results => generateTestersSearch(results)
)(() => 'placeholder');

export const selectTestersSearchInfo = createCachedSelector(
    selectResults,
    results => results.map(({ id, email }) => ({ id, email }))
)(() => 'placeholder');

export const selectIsValidTesterQuery = createCachedSelector(
    selectTestersSearch,
    (state, id) => id,
    ({ queryId }, id) => queryId === id
)(() => 'placeholder');

export const selectAreTestersSearching = createCachedSelector(
    selectTestersSearch,
    ({ isSearching }) => isSearching
)(() => 'placeholder');

export const selectFilters = createCachedSelector(
    selectTestersSearch,
    ({ filters }) => filters
)(() => 'placeholder');

export const selectPage = createCachedSelector(
    selectTestersSearch,
    ({ page }) => page
)(() => 'placeholder');

export const selectSortIndex = createCachedSelector(
    selectTestersSearch,
    ({ sortIndex }) => sortIndex
)(() => 'placeholder');

export const selectTowns = createCachedSelector(
    selectTestersSearch,
    ({ towns }) => towns
)(() => 'placeholder');

export const selectJobs = createCachedSelector(
    selectTestersSearch,
    ({ jobs }) => jobs
)(() => 'placeholder');

export const selectSortIndices = createCachedSelector(
    selectTestersSearch,
    ({ sortIndices }) => sortIndices
)(() => 'placeholder');

export const selectInSearchMode = createCachedSelector(
    selectTestersSearch,
    (_, testerId) => testerId,
    ({ results }, testerId) => results.some(({ id }) => id === testerId)
)(() => 'placeholder');

export const selectCanMoveForwardTester = createCachedSelector(
    selectInSearchMode,
    selectResults,
    selectSortIndices,
    (_, testerId) => testerId,
    (inSearch, results, sortIndices, testerId) => {
        if (inSearch) {
            const testerIdx = results.map(({ id }) => id).indexOf(testerId);

            return sortIndices.indexOf(testerIdx) + 1 !== sortIndices.length;
        } else {
            return false;
        }
    }
)(() => 'placeholder');

export const selectCanMoveBackwardTester = createCachedSelector(
    selectInSearchMode,
    selectResults,
    selectSortIndices,
    (_, testerId) => testerId,
    (inSearch, results, sortIndices, testerId) => {
        if (inSearch) {
            const testerIdx = results.map(({ id }) => id).indexOf(testerId);

            return sortIndices.indexOf(testerIdx) !== 0;
        } else {
            return false;
        }
    }
)(() => 'placeholder');

export const selectBackwardTesterId = createCachedSelector(
    selectResults,
    selectSortIndices,
    selectPage,
    (_, testerId) => testerId,
    (results, sortIndices, page, testerId) => {
        const resultIds = results.map(({ id }) => id);
        const testerIdx = resultIds.indexOf(testerId);

        const backwardTesterSortedIdx = sortIndices.indexOf(testerIdx) - 1;
        const backwardTesterPage = Math.floor(backwardTesterSortedIdx / 10) + 1;
        const backwardTesterIdx = sortIndices[backwardTesterSortedIdx];

        return {
            id: resultIds[backwardTesterIdx],
            page: backwardTesterPage === page ? null : backwardTesterPage
        };
    }
)(() => 'placeholder');

export const selectForwardTesterId = createCachedSelector(
    selectResults,
    selectSortIndices,
    selectPage,
    (_, testerId) => testerId,
    (results, sortIndices, page, testerId) => {
        const resultIds = results.map(({ id }) => id);
        const testerIdx = resultIds.indexOf(testerId);

        const forwardTesterSortedIdx = sortIndices.indexOf(testerIdx) + 1;
        const forwardTesterPage = Math.floor(forwardTesterSortedIdx / 10) + 1;
        const forwardTesterIdx = sortIndices[forwardTesterSortedIdx];

        return {
            id: resultIds[forwardTesterIdx],
            page: forwardTesterPage === page ? null : forwardTesterPage
        };
    }
)(() => 'placeholder');
