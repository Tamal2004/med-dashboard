export const validateRequired = (values, required) => {
    const initializedValues = {
        ...required.reduce(
            (acm, requiredKey) => ({ ...acm, [requiredKey]: '' }),
            {}
        ),
        ...values
    };
    const requiredValues = Object.splice(initializedValues, required);

    return Object.entries(requiredValues).reduce(
        (acm, [key, value]) => (value ? acm : { ...acm, [key]: 'Required' }),
        {}
    );
};
