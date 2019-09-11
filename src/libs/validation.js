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

const DateInFuture = date => {
    const splitDate = date.split('/');
    [splitDate[0], splitDate[1]] = [splitDate[1], splitDate[0]]; //swap first two value
    const newDate = splitDate.join('/');
    const diff =
        new Date(newDate).setHours(0, 0, 0, 0) >
        new Date().setHours(0, 0, 0, 0);
    return diff;
};

export const validateDate = value => {
    return value &&
        !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
            value
        )
        ? 'Invalid date'
        : value && DateInFuture(value)
        ? 'Invalid future date'
        : undefined;
};

export const validateNumber = value =>
    value && !/^[0-9]/i.test(value) ? 'Invalid number' : undefined;

export const validateTime = value =>
    value && !/([01]\d|2[0123]):(?:[012345]\d)/i.test(value)
        ? 'Invalid time'
        : undefined;
