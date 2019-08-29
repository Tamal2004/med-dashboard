import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';
import clients from './clients';
import datasets from './datasets';
import testers from './testers';
import projects from './projects';
import notification from './notification';
import utils from './utils';

const rootReducer = combineReducers({
    auth,
    clients,
    datasets,
    form,
    testers,
    projects,
    notification,
    utils
});

export default rootReducer;
