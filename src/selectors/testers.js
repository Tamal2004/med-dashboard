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
    ({ search }) => generateTestersSearch(search)
)(() => 'placeholder');

// export const selectTester = createCachedSelector(
//     selectTesters,
//     (state, index) => index,
//     (state, index) => {
//         const newObj = {};
//         const rowData = state[index];
//         const isEditable = value =>
//             Object.prototype.hasOwnProperty.call(value, 'editable');
//         if (rowData && typeof rowData === 'object') {
//             Object.keys(rowData).forEach(key => {
//                 if (isEditable(rowData[key]))
//                     newObj[key] = rowData[key].value || rowData[key].Component;
//             });
//         }
//
//         return newObj;
//     }
// )(() => 'placeholder');
