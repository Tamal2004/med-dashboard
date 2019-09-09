import React, { useEffect } from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material
import { withStyles, FormControl } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

// Local
import styles from './styles';
import withDateProvider from './withDateProvider';
import { composeClasses } from 'libs';

const DateInputBase = ({
    classes,
    styles,
    minDate = new Date('1900-01-01'),
    maxDate = new Date('2100-01-01'),
    input: { value, ...input },
    meta: { form },
    fieldName,
    label,
    required,
    disabled,
    handleForm,
    ...restProps
}) => {
    useEffect(() => handleForm(form));

    const c = composeClasses({ classes, styles });
    const id = `${form}-${fieldName}`;
    const success = !disabled && Boolean(value);

    const datePickerClassName = classNames(
        c.root,
        success && c.success,
        disabled && c.disabled
    );

    const datePickerProps = {
        className: datePickerClassName,
        disabled,
        id,
        minDate,
        maxDate,
        format: 'dd/MM/yyyy',
        value: value || null,
        InputProps: {
            disableUnderline: true,
            inputProps: { className: c.input }
        },
        ...input,
        ...restProps
    };

    return (
        <FormControl className={c.container}>
            <DatePicker {...datePickerProps} />
        </FormControl>
    );
};

DateInputBase.propTypes = {
    classes: PropTypes.object.isRequired,
    handleForm: () => {}
};

const _DateInputBase = compose(
    withDateProvider,
    withStyles(styles)
)(DateInputBase);

// Very crude fix
const normalizeDate = value => {
    if (!isNaN(Number(value.toString().split('')[0])))
        return value
            .split('/')
            .reverse()
            .join('-');
    return value ? new Date(value) : null;
};

const __DateInputBase = props => (
    <Field
        {...props}
        component={_DateInputBase}
        fieldName={props.name}
        normalize={normalizeDate}
    />
);

export { __DateInputBase as default, __DateInputBase as DateInputBase };
