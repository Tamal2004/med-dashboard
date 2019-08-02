import arrayEnhancers from './array';
import objectEnhancers from './object';

export * from './array';
export * from './object';

export default () => {
    arrayEnhancers();
    objectEnhancers();
};
