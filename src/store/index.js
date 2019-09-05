import { createStore } from 'redux';
// Local
import reducers from 'reducers';
import enhancers from './enhancers';

// Temp
// import clients from './20Clients';
// const composedClients = `mutation { createClients(clients: [ ${clients.clients
//     .map(({ id, name }) => `{ id: "${id}" name: "${name}" }`)
//     .join(' ')} ]) { id } }`;

// console.log(composedClients);

export default createStore(reducers, {}, enhancers);
