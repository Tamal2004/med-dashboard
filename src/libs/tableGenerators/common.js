import { serializeDate } from 'libs';

export const composeEditData = (data, idx) => {
    const row = data[idx];

    const isEditable = value =>
        Object.prototype.hasOwnProperty.call(value, 'editable');

    const name = value => value.split(' ').join('');

    if (row && typeof row === 'object') {
        return Object.entries(row).reduce(
            (acm, [key, value]) => {
                if (isEditable(value)) {
                    const type = value.type || 'Input';
                    const props = value.props || {};
                    const initialValue = value.value || value.Component;
                    return {
                        initialValues: {
                            ...acm.initialValues,
                            [name(key)]:
                                type === 'DateInput'
                                    ? serializeDate(initialValue)
                                    : initialValue
                        },
                        formData: [
                            ...acm.formData,
                            { key: name(key), label: key, type, props }
                        ]
                    };
                }
                return acm;
            },
            {
                initialValues: {},
                formData: []
            }
        );
    }
    return { initialValues: {}, formData: [] };
};
