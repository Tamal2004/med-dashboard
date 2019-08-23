import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Redux Dev Tools
const composeRDT = () =>
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f;

export default compose(
    applyMiddleware(thunk),
    composeRDT()
);
