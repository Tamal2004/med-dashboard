import createCachedSelector from 're-reselect';

// Local
import {
    mapArray,
    mapToSelect,
    generateClientProjects,
    generateClientList
} from 'libs';

const selectClients = state => state.clients;

const selectIndividual = createCachedSelector(
    selectClients,
    ({ individual }) => individual
)(() => 'placeholder');

// Client Individual
export const selectClientName = createCachedSelector(
    selectIndividual,
    ({ name }) => name
)(() => 'placeholder');

export const selectClientProjects = createCachedSelector(
    selectIndividual,
    ({ projects }) => generateClientProjects(projects)
)(() => 'placeholder');

// Client Id
export const selectClientId = createCachedSelector(
    selectClients,
    (state, clientIndex) => clientIndex,
    ({ list = [] }, clientIndex) => {
        return list[clientIndex] && list[clientIndex].id;
    }
)(() => 'placeholder');

// Client List
export const selectClientList = createCachedSelector(
    selectClients,
    ({ list }) => generateClientList(list)
)(() => 'placeholder');
