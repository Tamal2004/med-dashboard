export const normalizeDob = (val, prevVal) => {
    // Prevent non-digit characters being entered
    if (isNaN(parseInt(val[val.length - 1], 10)) && val !== '/') {
        return val.slice(0, -1);
    }

    // When user is deleting, this prevents immediate re-addition of '/' when it's deleted
    if (prevVal && prevVal.length >= val.length) {
        return val;
    }

    // Add / at appropriate sections of the input
    if (val.length >= 2 && val.split('')[2] !== '/') {
        const splitVal = val.split('');
        splitVal.splice(2, 0, '/');
        val = splitVal.join('');
    }

    if (val.length >= 5 && val.split('')[5] !== '/') {
        const splitVal = val.split('');
        splitVal.splice(5, 0, '/');
        val = splitVal.join('');
    }

    if (val.length === 2 || val.length === 5) {
        val += '/';
    }

    // Prevent characters being entered after Dob is full
    if (val.length >= 10) {
        return val.slice(0, 10);
    }

    return val;
};

export const normalizeTime = (val, prevVal) => {
    // Prevent non-digit characters being entered
    if (isNaN(parseInt(val[val.length - 1], 10))) {
        return val.slice(0, -1);
    }

    // When user is deleting, this prevents immediate re-addition of ':' when it's deleted
    if (prevVal && prevVal.length >= val.length) {
        return val;
    }

    // Add / at appropriate sections of the input
    if (val.length >= 2 && val.split('')[2] !== ':') {
        const splitVal = val.split('');
        splitVal.splice(2, 0, ':');
        val = splitVal.join('');
    }

    if (val.length === 2) {
        val += ':';
    }

    // Prevent characters being entered after Dob is full
    if (val.length >= 5) {
        return val.slice(0, 5);
    }

    return val;
};

export const normalizePhone = val => {
    const regEx = /^[a-zA-Z]+$/;
    const length = val.length;

    if (regEx.test(val[length - 1]) || length >= 15) {
        return val.slice(0, -1);
    }

    return val;
};

export const normalizeNumber = val => {
    // Prevent non-digit characters being entered
    if (isNaN(parseInt(val[val.length - 1], 10))) {
        return val.slice(0, -1);
    }
    return val;
};

export const normalizePounds = val => {
    // Prevent non-digit characters being entered
    if (isNaN(parseInt(val[val.length - 1], 10))) {
        return val.slice(0, -1);
    }

    if (!isNaN(parseInt(val[0]))) {
        const v = val.replace(/,/g, '').split('');
        v.unshift('£');
        return v.join('');
    }
    return val.replace(/,/g, '');
};
