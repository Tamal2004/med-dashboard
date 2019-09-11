export const mapToSelect = (dataset, value = void 0, label = void 0) => {
    if (dataset.length) {
        let valueKey = value;
        let labelKey = label;
        if (!value && !label) {
            const datasetKeys = Object.keys(dataset[0]);

            valueKey = datasetKeys.filter(
                datasetKey =>
                    !!datasetKey.includes('Id') &&
                    datasetKeys.includes(datasetKey.slice(0, -2))
            )[0];
            labelKey = valueKey.slice(0, -2);
        }

        return dataset.map(data => ({
            value: data[valueKey],
            label: data[labelKey]
        }));
    } else {
        return [];
    }
};

export const mapFromValue = (data, id = null) => {
    /*eslint-disable-next-line eqeqeq */
    const [{ label = '' } = {}] = data.filter(({ value }) => value == id);
    return label;
};

export const mapArray = data =>
    data.map(datum => ({ label: datum, value: datum }));
