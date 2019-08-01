import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Local
import reducers from 'reducers';

//check for dev environment
const ENV = process.env;
const isDevEnv = () => ENV.NODE_ENV === 'development';


let enhancers = compose(
    applyMiddleware(thunk)
);

// For dev, enable redux dev tool
if (isDevEnv()) {
    enhancers = compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    );
}

export default createStore(reducers,{}, enhancers);

