const normalizeDate = date => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // Format - MM/dd/yyyy
    return new Date(date).toLocaleString('en-US', options);
};

export { normalizeDate as default, normalizeDate };
