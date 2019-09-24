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

export const selectTesterResults = createCachedSelector(
    selectTestersSearch,
    ({ results }) => generateTestersSearch(results)
)(() => 'placeholder');

export const selectTestersSearchInfo = createCachedSelector(
    selectTestersSearch,
    ({ results }) => results.map(({ id, email }) => ({ id, email }))
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
