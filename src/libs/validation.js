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

export const validateEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const validateDate = value =>
    value &&
    !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(value)
        ? 'Invalid date'
        : undefined;

export const validateNumber = value =>
    value && !/^[0-9]/i.test(value) ? 'Invalid number' : undefined;
