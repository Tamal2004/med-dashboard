import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';
import datasets from './datasets';
import notification from './notification';
import utils from './utils';

const rootReducer = combineReducers({
	auth,
	datasets,
	form,
	notification,
	utils
});

export default rootReducer;
