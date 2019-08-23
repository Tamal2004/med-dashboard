export const normalizeDate = date => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // Format - MM/dd/yyyy
    return new Date(date).toLocaleString('en-US', options);
};

export const deserializeDate = dateString =>
    dateString ? new Date(dateString).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }) : null;

export const serializeDate = date =>
    date
        .split('/')
        .reverse()
        .join('-');