import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { makeStyles } from '@material-ui/styles';

// Material
import {
    InputBase as MuiInputBase,
    InputAdornment,
    FormControl
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

// Local
import styles from './styles';
import { LabelBase } from 'components';
import { composeClasses } from 'libs';

const LockAdornment = props => (
    <InputAdornment {...props} position='end'>
        <LockIcon color='disabled' />
    </InputAdornment>
);

const useStyles = makeStyles(styles);

const InputBase = ({
    styles,
    className,
    meta: { form, ...meta },
    fieldName,
    input,
    disabled,
    required,
    label,
    handleForm,
    handleError,
    ...restProps
}) => {
    const c = composeClasses({ classes: useStyles(), styles });
    const id = `${form}-${fieldName}`;

    const success = !disabled && Boolean(input.value);
    const error = meta.touched && !!meta.error;

    useEffect(() => {
        handleError && meta.touched && handleError(meta.error);
    });

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

InputBase.propTypes = {
    handleForm: () => {}
};

// const _InputBase = withStyles(styles)(InputBase);

const __InputBase = props => (
    <Field fieldName={props.name} component={InputBase} {...props} />
);

export { __InputBase as default, __InputBase as InputBase };
