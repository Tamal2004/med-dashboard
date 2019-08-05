import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Reducers
import auth from './auth';

const rootReducer = combineReducers({
    auth,
    form
});

export default rootReducer;
