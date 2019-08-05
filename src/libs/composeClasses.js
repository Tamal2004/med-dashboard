import classNames from 'classnames';

const composeClasses = ({ classes, styles = {} }, renames = {}) =>
    Object.entries(classes).reduce(
        (accumulator, [key, value]) => ({
            ...accumulator,
            [[renames[key] ? renames[key] : key]]: classNames(
                value,
                styles[key]
            )
        }),
        {}
    );

export { composeClasses as default, composeClasses };
