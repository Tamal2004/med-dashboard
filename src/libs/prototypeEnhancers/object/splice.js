export default (data, mapping) => {
    try {
        const mappingIsObject =
            typeof mapping === 'object' && !Array.isArray(mapping); // Is an object
        const dataKeys = mappingIsObject ? Object.keys(mapping) : [...mapping];

        const mapKeys = mappingIsObject ? Object.values(mapping) : null;

        const res = dataKeys.reduce((accumulator, key, index) => {
            if (typeof data[key] !== 'undefined') {
                if (mappingIsObject && mapKeys[index] !== '') {
                    return {
                        ...accumulator,
                        [mapKeys[index]]: data[key]
                    };
                } else {
                    return {
                        ...accumulator,
                        [key]: data[key]
                    };
                }
            } else {
                return accumulator;
                // throw Error(`Property '${key}' does not exist in object`);
            }
        }, {});
        return res;
    } catch (error) {}
};
