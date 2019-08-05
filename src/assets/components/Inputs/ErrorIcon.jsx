import React from 'react';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';
import ErrorIconRounded from '@material-ui/icons/ErrorOutlineRounded';

const styles = ({ palette, spacing }) => ({
    root: {
        width: spacing.unit * 3,
        height: spacing.unit * 3,
        color: palette.error.light
    }
});

const ErrorIcon = ({
    classes: c,
    className
}) => {
    const root = classNames(c.root, className);
    return (
        <ErrorIconRounded className={root}/>
    );
};

const _ErrorIcon = withStyles(styles)(ErrorIcon);

export { _ErrorIcon as default, _ErrorIcon as ErrorIcon };
