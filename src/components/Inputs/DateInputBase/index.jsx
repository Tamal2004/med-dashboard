import React from 'react';
import { compose } from 'redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material
import {
    withStyles,
    InputAdornment,
    ButtonBase,
    FormControl
} from '@material-ui/core/';
import CalendarIcon from '@material-ui/icons/DateRangeOutlined';
import DisabledCalendarIcon from '@material-ui/icons/DateRange';
import { DatePicker } from 'material-ui-pickers';

// Local
import styles from './styles';
import withDateProvider from './withDateProvider';
import { LabelBase } from 'components';
import { composeClasses, normalizeDate, denormalizeDate } from 'helpers';

const DateAdornment = ({ className, disabled, ...restProps }) => (
    <InputAdornment {...restProps} position='end'>
        <ButtonBase className={className} disabled={disabled}>
            {!disabled ? (
                <CalendarIcon color='inherit' />
            ) : (
                <DisabledCalendarIcon color='inherit' />
            )}
        </ButtonBase>
    </InputAdornment>
);

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

    const adornmentProps = {
        className: classNames(c.adornment, disabled && c.adornmentDisabled),
        disabled
    };

    const datePickerProps = {
        className: datePickerClassName,
        disabled,
        id,
        minDate,
        maxDate,
        format: 'dd-MM-yyyy',
        value: value ? denormalizeDate(value) : null,
        InputProps: {
            disableUnderline: true,
            inputProps: { className: c.input },
            endAdornment: <DateAdornment {...adornmentProps} />
        },
        ...input,
        ...restProps
    };

    return (
        <FormControl className={c.container}>
            {label && (
                <LabelBase
                    label={label}
                    disabled={disabled}
                    required={required}
                    success={success}
                    htmlFor={id}
                />
            )}
            <DatePicker {...datePickerProps} />
        </FormControl>
    );
};

DateInputBase.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node
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
        normalize={normalizeDate}
    />
);

export { __DateInputBase as default, __DateInputBase as DateInputBase };
