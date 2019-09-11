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

const DateRangeCheck = date => {
    let result = undefined;
    const splitDate = date.split('/');
    [splitDate[0], splitDate[1]] = [splitDate[1], splitDate[0]]; //swap first two value, because JavaScript expect MM/DD/YYYY format
    const newDate = splitDate.join('/');
    const isInFuture =
        new Date(newDate).setHours(0, 0, 0, 0) >
        new Date().setHours(0, 0, 0, 0);

    const isInPast =
        new Date(newDate).setHours(0, 0, 0, 0) <
        new Date('01/01/1970').setHours(0, 0, 0, 0);

    if (isInFuture) result = 'Invalid future date';
    if (isInPast) result = 'Invalid past date';

    return result;
};

export const validateDate = value => {
    return value &&
        !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
            value
        )
        ? 'Invalid date'
        : value && DateRangeCheck(value);
};

export const validateNumber = value =>
    value && !/^[0-9]/i.test(value) ? 'Invalid number' : undefined;
