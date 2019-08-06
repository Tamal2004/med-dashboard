import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';
import datasets from './datasets';

const rootReducer = combineReducers({
    auth,
    datasets,
    form
});

export default rootReducer;
