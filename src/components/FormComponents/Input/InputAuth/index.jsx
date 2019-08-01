import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { InputBase } from 'components';

const AdornmentWrapper = ({ children }) => (
    <div style={{ paddingRight: 16 }}>{children}</div>
);

const getVariantIcon = variant => {
    let Icon;
    switch (variant) {
        case 'user':
            Icon = <AccountCircle />;
            break;

        case 'lock':
            Icon = <LockIcon />;
            break;

        default:
            Icon = <LockIcon />;
            break;
    }

    return <AdornmentWrapper>{Icon}</AdornmentWrapper>;
};

const AuthInput = ({ placeholder, variant, ...restProps }) => {
    const props = {
        placeholder,
        startAdornment: variant && getVariantIcon(variant),
        ...restProps
    };
    return <InputBase {...props} />;
};

const _AuthInput = withStyles(styles)(AuthInput);

export { _AuthInput as default, _AuthInput as AuthInput };
