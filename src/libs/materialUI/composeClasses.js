import clsx from 'clsx';

const composeClasses = ({ classes, styles = {} }, renames = {}) =>
    Object.entries(classes).reduce(
        (accumulator, [key, value]) => ({
            ...accumulator,
            [[renames[key] ? renames[key] : key]]: clsx(
                value,
                styles[key]
            )
        }),
        {}
    );

export { composeClasses as default, composeClasses };
