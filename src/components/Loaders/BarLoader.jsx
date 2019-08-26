import React from 'react';
import clsx from 'clsx';
import { BarLoader as CSSBarLoader } from 'react-css-loaders';

import { makeStyles, useTheme } from '@material-ui/core';
//import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: spacing(28)
    }
}));

const BarLoader = ({ className, color, ...restProps }) => {
    const primaryColor = useTheme().palette.primary.light;
    const props = {
        color: color || primaryColor,
        ...restProps
    };
    return (
        <div className={clsx(useStyles().root, className)}>
            <CSSBarLoader {...props} />
        </div>
    );
};

BarLoader.defaultProps = {
    size: 16
};

export { BarLoader as default, BarLoader };
