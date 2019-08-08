import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';
import datasets from './datasets';
import utils from './utils';

const rootReducer = combineReducers({
    auth,
    datasets,
    form,
    utils
});

export default rootReducer;
