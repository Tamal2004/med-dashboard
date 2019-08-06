export const validateRequired = (values, required) => {
    const valid = Object.values(Object.splice(values, required)).filter(
        value => value !== '' || value != 0
    ).length;
    if (valid < required.length) return { [required[0]]: 'error' };
};
