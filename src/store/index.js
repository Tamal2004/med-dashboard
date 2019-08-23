import { createStore } from 'redux';
// Local
import reducers from 'reducers';
import enhancers from './enhancers';

export default createStore(reducers, {}, enhancers);
