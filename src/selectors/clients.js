import createCachedSelector from 're-reselect';

// Local
import { mapArray, mapToSelect, generateClientList } from 'libs';
import { selectIndividual as selectTesterIndividual } from './testers';

const selectClients = state => state.clients;

const selectIndividual = createCachedSelector(
    selectClients,
    ({ individual }) => individual
)(() => 'placeholder');

// Client Individual

// Session Id
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
