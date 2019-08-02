import splice from './splice';
import apply from './apply';

export default () => {
    Object.splice = splice;
    Object.apply = apply;
};
