import React from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material
import {
    withStyles,
    FormControl
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

// Local
import styles from './styles';
import withDateProvider from './withDateProvider';
import { composeClasses } from 'libs';

const DateInputBase = ({
    classes,
    styles,
    minDate = new Date(new Date().getFullYear() - 1 + '-01-01'), // limited to previous 1 year
    maxDate = new Date('2100-01-01'),
    input: { value, ...input },
    meta: { form },
    fieldName,
    label,
    required,
    disabled,
    ...restProps
}) => {
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
        format: 'yyyy-MM-dd',
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
};

const _DateInputBase = compose(
    withDateProvider,
    withStyles(styles)
)(DateInputBase);

const __DateInputBase = props => (
    <Field
        {...props}
        component={_DateInputBase}
        fieldName={props.name}
    />
);

export { __DateInputBase as default, __DateInputBase as DateInputBase };
