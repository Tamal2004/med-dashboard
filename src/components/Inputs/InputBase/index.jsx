import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';

// Material
import {
    withStyles,
    InputBase as MuiInputBase,
    InputAdornment,
    FormControl
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

// Local
import styles from './styles';
import { LabelBase} from 'components';
import { composeClasses } from 'libs';

const LockAdornment = props => (
    <InputAdornment {...props} position='end'>
        <LockIcon color='disabled' />
    </InputAdornment>
);

const InputBase = ({
    classes,
    styles,
    className,
    meta: { form, ...meta },
    fieldName,
    input,
    disabled,
    required,
    label,
    ...restProps
}) => {
    const c = composeClasses({ classes, styles });
    const id = `${form}-${fieldName}`;

    const success = !disabled && Boolean(input.value);
    const error = meta.touched && !!meta.error;
    const inputBaseProps = {
        classes: {
            root: classNames(
                c.root,
                className,
                error && c.error,
                success && c.success
            ),
            ...Object.splice(c, [
                'input',
                'focused',
                'multiline',
                'inputMultiline',
                'disabled'
            ])
        },
        ...input,
        endAdornment: disabled && <LockAdornment className={c.adornment} />,
        disabled,
        id,
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
            <MuiInputBase {...inputBaseProps} />
        </FormControl>
    );
};

const _InputBase = withStyles(styles)(InputBase);

const __InputBase = props => (
    <Field fieldName={props.name} component={_InputBase} {...props} />
);

export { __InputBase as default, __InputBase as InputBase };
