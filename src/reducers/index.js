import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';
import datasets from './datasets';
import testers from './testers';
import projects from './projects';
import utils from './utils';

const rootReducer = combineReducers({
    auth,
    datasets,
    form,
    testers,
    projects,
    utils
});

export default rootReducer;
